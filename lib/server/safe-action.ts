// lib/server/safe-action.ts
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

const metadataSchema = z.object({
  actionName: z.string().optional(),
});

const customServerErrorHandler = (error: Error) => {
  console.error(
    'SERVER ACTION ERROR (CAUGHT BY customServerErrorHandler):',
    error
  );
  if (error && typeof error === 'object' && 'validationErrors' in error) {
    console.error(
      'Zod Validation Errors (from metadata):',
      JSON.stringify((error as Error & { validationErrors?: unknown }).validationErrors, null, 2)
    );
  }
  return error.message || 'An unexpected error occurred on the server.';
};

export const actionClient = createSafeActionClient({
  handleServerError: customServerErrorHandler,
}).defineMetadataSchema(metadataSchema);
