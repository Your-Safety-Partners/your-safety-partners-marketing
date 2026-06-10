'use client';

import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { submitContactForm } from '@/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextArea } from '@/components/ui/textarea';

const fieldClass =
  'h-11 rounded-xl border-gray-200 bg-white text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500/30';

const textAreaClass =
  'min-h-[168px] resize-y rounded-xl border-gray-200 bg-white py-3 text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500/30';

function FieldLabel({
  htmlFor,
  children,
  required = true,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
      {children}
      {required ? <span className="text-destructive"> *</span> : null}
    </Label>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContactForm(data);

    if (result?.serverError) {
      toast.error(result.serverError);
    } else if (result?.data) {
      toast.success(result.data);
      reset();
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] md:p-8">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
        Send us a message
      </h2>
      <p className="mt-2 text-sm text-gray-500 md:text-base">
        Fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-2">
          <FieldLabel htmlFor="contact-name">Full name</FieldLabel>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Jane Doe"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            className={fieldClass}
            {...register('name')}
          />
          {errors.name?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            className={fieldClass}
            {...register('email')}
          />
          {errors.email?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="contact-company" required={false}>
            Company
          </FieldLabel>
          <Input
            id="contact-company"
            autoComplete="organization"
            placeholder="ACME Pty Ltd"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.company)}
            className={fieldClass}
            {...register('company')}
          />
          {errors.company?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.company.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <TextArea
            id="contact-message"
            rows={6}
            placeholder="Tell us about your safety needs..."
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.message)}
            className={textAreaClass}
            {...register('message')}
          />
          {errors.message?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-auto w-full rounded-xl border-0 bg-violet-700 py-3 text-base font-medium text-white hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
        >
          <span className="inline-flex items-center justify-center gap-2 text-sm md:text-base">
            Send message
            <ArrowUpRight className="size-4 shrink-0 stroke-[2]" aria-hidden />
          </span>
        </Button>
      </form>
    </div>
  );
}
