import logtail from '@logtail/pino';
import { Console, Effect, pipe } from 'effect';
import type { DestinationStream, Logger } from 'pino';
import pino from 'pino';
import pretty from 'pino-pretty';
import { getEffectiveLogLevel } from '../../lib/shared/logConfig';
import { config } from 'dotenv';

config({ path: '.env' });

// Helper to create the Logtail stream with a timeout and connectivity check
const createLogtailStream = Effect.tryPromise({
  try: async () => {
    // 1. Quick connectivity check to fail fast if network is down/blocked.
    // We use a short timeout (1s) to verify we can reach the endpoint.
    // If this fails (ETIMEDOUT), we assume Logtail is unreachable and fallback to console
    // to avoid blocking the application with long timeouts during logging.
    try {
      await fetch('https://s1238029.eu-nbg-2.betterstackdata.com', {
        method: 'HEAD', // Lightweight request
        signal: AbortSignal.timeout(1000), // Fail fast
      });
    } catch (e) {
      // If this check fails, throw immediately to trigger the catchAll fallback below
      console.warn(
        '[Logger] Logtail connectivity check failed, falling back to console:',
        e instanceof Error ? e.message : String(e)
      );
      throw new Error('Logtail endpoint unreachable');
    }

    // 2. If reachable, proceed with Logtail initialization
    return Promise.race([
      logtail({
        sourceToken: process.env.LOGTAIL_SOURCE_TOKEN || '',
        options: {
          sendLogsToBetterStack: true,
          endpoint: 'https://s1238029.eu-nbg-2.betterstackdata.com',
        },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('Logtail initialization timed out')),
          2000
        )
      ),
    ]);
  },
  catch: (e) =>
    new Error(`Logtail error: ${e instanceof Error ? e.message : String(e)}`),
});

const createLoggerEffect = pipe(
  Effect.sync(() => process.env.NODE_ENV ?? 'development'),
  Effect.flatMap((env) =>
    env === 'production'
      ? pipe(
          createLogtailStream,
          Effect.map(
            (ltStream) =>
              pino.multistream([
                ltStream,
                { stream: pretty() },
              ]) as DestinationStream
          ),
          // Fallback to just pretty console if Logtail fails
          Effect.catchAll((error) => {
            Console.error(
              `[Logger] Failed to initialize Logtail, falling back to console: ${error.message}`
            );
            return Effect.succeed(
              pretty({ colorize: true }) as DestinationStream
            );
          })
        )
      : Effect.succeed(pretty({ colorize: true }) as DestinationStream)
  ),
  Effect.map((stream: DestinationStream) =>
    pino({ base: undefined, level: getEffectiveLogLevel() }, stream)
  ),
  Effect.tap(() => Console.log('Server Logger created successfully'))
);

// Lazy load the logger to prevent top-level await blocking
let _loggerPromise: Promise<Logger> | null = null;

export function getLoggerPromise(): Promise<Logger> {
  if (!_loggerPromise) {
    _loggerPromise = Effect.runPromise(createLoggerEffect);
  }
  return _loggerPromise;
}

export async function getLoggerWithUser(
  userId?: string,
  company?: string
): Promise<Logger> {
  const logger = await getLoggerPromise();
  return logger.child({ userId, ...(company ? { company } : {}) });
}

export async function setServerLogLevel(newLevel: string): Promise<void> {
  const logger = await getLoggerPromise();
  logger.level = newLevel;
}

export function serverLog(
  level: 'info' | 'error',
  message: string,
  userId?: string,
  company?: string
): Effect.Effect<void, never, never> {
  const logTask = pipe(
    Effect.tryPromise({
      try: () => getLoggerWithUser(userId, company),
      catch: (e) => new Error(`Failed to get logger: ${e}`),
    }),
    Effect.flatMap((logger: Logger) =>
      Effect.sync(() => {
        logger[level](message);
      })
    ),
    // Timeout to ensure we don't hang waiting for logger
    Effect.timeout('2 seconds'),
    Effect.catchAll((error) =>
      Effect.sync(() => {
        if (process.env.NODE_ENV !== 'test') {
          console.error(
            `[Fallback Log] ${level}: ${message} (Error: ${error})`
          );
        }
      })
    )
  );

  return pipe(Effect.forkDaemon(logTask), Effect.as(undefined));
}
