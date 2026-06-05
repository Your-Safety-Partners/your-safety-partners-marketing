'use client';

import type { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

import { submitBookADemoForm } from '@/actions/contact';
import { DemoDatePicker } from '@/components/book-a-demo/demo-date-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { bookADemoFormSchema, type BookADemoFormData } from '@/lib/schemas';

const fieldClass =
  'h-11 rounded-xl border-gray-200 bg-white text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500/30';

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
      {children} <span className="text-destructive">*</span>
    </Label>
  );
}

export function BookADemoForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookADemoFormData>({
    resolver: zodResolver(bookADemoFormSchema),
    defaultValues: {
      preferredDate: '',
    },
  });

  const onSubmit = async (data: BookADemoFormData) => {
    const result = await submitBookADemoForm(data);

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
        Schedule your session
      </h2>
      <p className="mt-2 text-sm text-gray-500 md:text-base">
        Fill in your details, pick a slot, and you&apos;re set.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="demo-name">Full name</FieldLabel>
            <Input
              id="demo-name"
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
            <FieldLabel htmlFor="demo-email">Work email</FieldLabel>
            <Input
              id="demo-email"
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
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="demo-company">Company</FieldLabel>
          <Input
            id="demo-company"
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

        <Controller
          name="preferredDate"
          control={control}
          render={({ field }) => (
            <DemoDatePicker
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              error={errors.preferredDate?.message}
            />
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-auto w-full rounded-xl border-0 bg-violet-700 py-3 text-base font-medium text-white hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
        >
          <span className="inline-flex items-center justify-center gap-2 text-sm md:text-base">
            Book my demo
            <ArrowUpRight className="size-4 shrink-0 stroke-[2]" aria-hidden />
          </span>
        </Button>
      </form>
    </div>
  );
}
