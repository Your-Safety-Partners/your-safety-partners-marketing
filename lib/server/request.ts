// lib/server/request.ts
import { pipe } from 'effect';
import * as Effect from 'effect/Effect';
import { headers } from 'next/headers';

import { RefillingTokenBucket } from './rate-limit';

export const globalBucket = new RefillingTokenBucket<string>(100, 1);

// Wrap the headers() call in an effect.
// We assume headers() might throw an error, so we use tryPromise.
const getHeadersEffect = Effect.tryPromise({
  try: () => Promise.resolve(headers()),
  catch: (error) => new Error(`Failed to get headers: ${error}`),
});

// Helper to extract the client IP from headers.
const getClientIP = (reqHeaders: Headers): string | null =>
  reqHeaders.get('X-Forwarded-For');

// Create an effect-based GET rate limit function.
export const globalGETRateLimitEffect = pipe(
  getHeadersEffect,
  Effect.map((reqHeaders) => getClientIP(reqHeaders)),
  Effect.flatMap((clientIP) => {
    if (process.env.NODE_ENV === 'development') {
      return Effect.succeed(true);
    }
    return clientIP === null
      ? Effect.succeed(true)
      : Effect.tryPromise({
          try: () => Promise.resolve(globalBucket.consume(clientIP, 1)),
          catch: (error) =>
            new Error(`Error during GET rate limiting: ${error}`),
        });
  })
);

// Create an effect-based POST rate limit function.
export const globalPOSTRateLimitEffect = pipe(
  getHeadersEffect,
  Effect.map((reqHeaders) => getClientIP(reqHeaders)),
  Effect.flatMap((clientIP) => {
    if (process.env.NODE_ENV === 'development') {
      return Effect.succeed(true);
    }
    return clientIP === null
      ? Effect.succeed(true)
      : Effect.tryPromise({
          try: () => Promise.resolve(globalBucket.consume(clientIP, 3)),
          catch: (error) =>
            new Error(`Error during POST rate limiting: ${error}`),
        });
  })
);
