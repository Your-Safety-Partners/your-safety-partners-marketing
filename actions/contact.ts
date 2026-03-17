// actions/contact.ts
'use server';

import { actionClient } from '@/lib/server/safe-action';
import { contactFormSchema } from '@/lib/schemas';
import { globalPOSTRateLimitEffect } from '@/lib/server/request';
import * as Effect from 'effect/Effect';
import { getLoggerPromise } from '@/lib/server/logger.server';

export const submitContactForm = actionClient
  .schema(contactFormSchema)
  .action(async ({ parsedInput: { name, email, company, message } }) => {
    // 1. Apply rate limiting before processing
    const rateLimited = await Effect.runPromise(globalPOSTRateLimitEffect);
    if (!rateLimited) {
      console.warn(`Rate limit exceeded for contact form submission from email: ${email}`);
      return {
        failure: 'Too many requests. Please try again in a moment.',
      };
    }

    try {
      const logger = await getLoggerPromise();
      logger.info(
        { lead: { name, email, company, message } },
        'New contact form submission received.'
      );
      
      // TODO: Integrate with your CRM or Email Service
      // Example: await sendToHubspot({ name, email, company, message });
      // Example: await resend.emails.send({ ... });

      return {
        success: `Thank you, ${name}! We've received your message and will be in touch shortly.`,
      };
    } catch (error) {
      console.error('Failed to process contact form submission:', error);
      return {
        failure: 'An unexpected error occurred. Please try again.',
      };
    }
  });
