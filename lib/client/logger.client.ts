import type { Browser as Logtail } from '@logtail/js';
import { Console, Effect, pipe } from 'effect';

import { getEffectiveLogLevel, levelRank } from '@/lib/shared/logConfig';

export type Logger = {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
};

const shouldLog = (
  messageLevel: keyof typeof levelRank,
  userId?: string
): boolean =>
  levelRank[messageLevel] >= levelRank[getEffectiveLogLevel(userId)];

const adaptLogtail = (lt: Logtail, userId?: string): Logger => ({
  info: (...args: Parameters<Logtail['info']>) => {
    if (shouldLog('info', userId)) lt.info(...args);
  },
  error: (...args: Parameters<Logtail['error']>) => {
    if (shouldLog('error', userId)) lt.error(...args);
  },
  warn: (...args: Parameters<Logtail['warn']>) => {
    if (shouldLog('warn', userId)) lt.warn(...args);
  },
  debug: (...args: Parameters<Logtail['debug']>) => {
    if (shouldLog('debug', userId)) lt.debug(...args);
  },
});

const createClientLoggerEffect = pipe(
  // Replace 'your-token' with your actual Logtail token.
  Effect.tryPromise(() =>
    import('@logtail/js').then(
      ({ Browser }) =>
        new Browser(process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN!)
    )
  ),
  Effect.map((lt) => adaptLogtail(lt)),
  Effect.tap(() => Console.log('Client logger created successfully'))
);

export const clientLoggerPromise: Promise<Logger> = Effect.runPromise(
  createClientLoggerEffect
) as Promise<Logger>;

export async function getClientLoggerWithUser(
  userId?: string,
  company?: string
): Promise<Logger> {
  const logger = await clientLoggerPromise;
  const prefix = `[user: ${userId || 'guest'}]${company ? ` [company: ${company}]` : ''}`;
  
  const formatArgs = (args: unknown[]) => {
    const msg = args.length > 0 ? String(args[0]) : '';
    const context = args.length > 1 ? args[1] : undefined;
    return context !== undefined ? [`${prefix} ${msg}`, context] : [`${prefix} ${msg}`];
  };

  return {
    info: (...args: unknown[]) => logger.info(...formatArgs(args)),
    error: (...args: unknown[]) => logger.error(...formatArgs(args)),
    warn: (...args: unknown[]) => logger.warn(...formatArgs(args)),
    debug: (...args: unknown[]) => logger.debug(...formatArgs(args)),
  };
}

/**
 * Generic client logging helper that returns an Effect which logs the given message.
 */
export function clientLog(
  level: 'info' | 'error' | 'warn' | 'debug',
  message: string,
  userId?: string,
  company?: string
): Effect.Effect<void, never, never> {
  // Changed to void, never, never
  return pipe(
    Effect.tryPromise(() => getClientLoggerWithUser(userId, company)),
    Effect.flatMap((logger: Logger) =>
      Effect.sync(() => logger[level](message))
    ),
    Effect.catchAll(() => Effect.succeed(undefined))
  );
}
