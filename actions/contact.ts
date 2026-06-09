'use server';

import { actionClient } from '@/lib/server/safe-action';
import {
  bookADemoFormSchema,
  contactFormSchema,
  contactUsSliceFormSchema,
} from '@/lib/schemas';
import { globalPOSTRateLimitEffect } from '@/lib/server/request';
import { isMicrosoftCalendarConfigured } from '@/lib/microsoft-graph/config';
import { createTeamsDemoEvent } from '@/lib/microsoft-graph/booking';
import * as Effect from 'effect/Effect';
import { getLoggerPromise } from '@/lib/server/logger.server';


export const submitContactForm = actionClient
  .schema(contactFormSchema)
  .action(async ({ parsedInput: { name, email, company, message } }) => {
    // 1. Apply rate limiting before processing
    const rateLimited = await Effect.runPromise(globalPOSTRateLimitEffect);
    if (!rateLimited) {
      const logger = await getLoggerPromise();
      logger.warn(`Rate limit exceeded for contact form submission from email: ${email}`);
      throw new Error('Too many requests. Please try again in a moment.');
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

      return `Thank you, ${name}! We've received your message and will be in touch shortly.`;
    } catch (error) {
      const logger = await getLoggerPromise();
      logger.error(error, 'Failed to process contact form submission');
      throw new Error('An unexpected error occurred. Please try again.');
    }
  });

export const submitContactUsSliceForm = actionClient
  .schema(contactUsSliceFormSchema)
  .action(async ({ parsedInput: { name, email, phone, message } }) => {
    const rateLimited = await Effect.runPromise(globalPOSTRateLimitEffect);
    if (!rateLimited) {
      const logger = await getLoggerPromise();
      logger.warn(`Rate limit exceeded for contact slice submission from email: ${email}`);
      throw new Error('Too many requests. Please try again in a moment.');
    }

    try {
      const logger = await getLoggerPromise();
      logger.info(
        { lead: { name, email, phone, message } },
        'New contact slice form submission received.'
      );

      return `Thank you, ${name}! We've received your message and will be in touch shortly.`;
    } catch (error) {
      const logger = await getLoggerPromise();
      logger.error(error, 'Failed to process contact slice form submission');
      throw new Error('An unexpected error occurred. Please try again.');
    }
  });

export const submitBookADemoForm = actionClient
  .schema(bookADemoFormSchema)
  .action(
    async ({
      parsedInput: { name, email, company, preferredDate, preferredTime },
    }) => {
      const rateLimited = await Effect.runPromise(globalPOSTRateLimitEffect);
      if (!rateLimited) {
        const logger = await getLoggerPromise();
        logger.warn(`Rate limit exceeded for book a demo submission from email: ${email}`);
        throw new Error('Too many requests. Please try again in a moment.');
      }

      try {
        const logger = await getLoggerPromise();

        if (isMicrosoftCalendarConfigured()) {
          const booking = await createTeamsDemoEvent({
            name,
            email,
            company,
            preferredDate,
            preferredTime,
          });

          logger.info(
            { lead: { name, email, company, preferredDate, preferredTime, teamsJoinUrl: booking.teamsJoinUrl } },
            'Teams demo booked successfully.'
          );

          return `Thank you, ${name}! Your demo is scheduled for ${booking.formattedDateTime}. A Teams calendar invite has been sent to ${email}.`;
        }

        logger.info(
          { lead: { name, email, company, preferredDate, preferredTime } },
          'New book a demo form submission received (calendar not configured).'
        );

        return `Thank you, ${name}! We've received your demo request for ${preferredDate} at ${preferredTime}. We'll be in touch shortly.`;
      } catch (error) {
        const logger = await getLoggerPromise();
        logger.error(error, 'Failed to process book a demo form submission');
        throw error instanceof Error
          ? error
          : new Error('An unexpected error occurred. Please try again.');
      }
    }
  );
