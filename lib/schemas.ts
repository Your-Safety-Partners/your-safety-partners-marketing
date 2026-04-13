import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Contact form embedded in the Contact Us Prismic slice (includes phone). */
export const contactUsSliceFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(8, { message: 'Please enter a valid phone number.' })
    .max(32, { message: 'Phone number is too long.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' }),
});

export type ContactUsSliceFormData = z.infer<typeof contactUsSliceFormSchema>;
