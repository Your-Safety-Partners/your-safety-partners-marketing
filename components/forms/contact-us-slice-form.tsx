'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

import { submitContactUsSliceForm } from '@/actions/contact';
import { contactUsSliceFormSchema, type ContactUsSliceFormData } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextArea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const fieldClass =
  'h-11 rounded-xl border-gray-200 bg-white text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500/30';

const textAreaClass =
  'min-h-[168px] resize-y rounded-xl border-gray-200 bg-white py-3 text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500/30';

type ContactUsSliceFormProps = {
  formTitle: string;
  className?: string;
};

export function ContactUsSliceForm({ formTitle, className }: ContactUsSliceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactUsSliceFormData>({
    resolver: zodResolver(contactUsSliceFormSchema),
  });

  const onSubmit = async (data: ContactUsSliceFormData) => {
    const result = await submitContactUsSliceForm(data);

    if (result?.serverError) {
      toast.error(result.serverError);
    } else if (result?.data) {
      toast.success(result.data);
      reset();
    }
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] md:p-8',
        className
      )}
    >
      <h3 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">{formTitle}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-slice-name" className="sr-only">
            Your Name (required)
          </Label>
          <Input
            id="contact-slice-name"
            autoComplete="name"
            placeholder="Your Name *"
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
          <Label htmlFor="contact-slice-email" className="sr-only">
            Email Address (required)
          </Label>
          <Input
            id="contact-slice-email"
            type="email"
            autoComplete="email"
            placeholder="Email Address *"
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
          <Label htmlFor="contact-slice-phone" className="sr-only">
            Your Phone Number (required)
          </Label>
          <Input
            id="contact-slice-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your Phone Number *"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.phone)}
            className={fieldClass}
            {...register('phone')}
          />
          {errors.phone?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-slice-message" className="sr-only">
            Your Message (required)
          </Label>
          <TextArea
            id="contact-slice-message"
            rows={6}
            placeholder="Your Message *"
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
          className="mt-2 h-auto w-full rounded-xl border-0 bg-violet-700 py-2.5 text-base font-medium text-white hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
        >
          <span className="inline-flex items-center text-sm justify-center gap-2">
            Send Message
            <ArrowUpRight className="size-4 shrink-0 stroke-[2]" aria-hidden />
          </span>
        </Button>
      </form>
    </div>
  );
}
