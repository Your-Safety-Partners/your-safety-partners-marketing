'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { submitContactForm } from '@/actions/contact';
import CustomInput from '@/components/custom-ui/custom-input';
import CustomButton from '@/components/custom-ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    <Card>
      <CardHeader>
        <CardTitle>Book a Demo</CardTitle>
        <CardDescription>Fill out the form below and we'll contact you to schedule a personalized demo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CustomInput<ContactFormData>
            label="Full Name"
            name="name"
            register={register}
            placeholder="Jane Doe"
            validationError={errors.name?.message}
            disabled={isSubmitting}
          />
          <CustomInput<ContactFormData>
            label="Work Email"
            name="email"
            type="email"
            register={register}
            placeholder="jane.doe@company.com"
            validationError={errors.email?.message}
            disabled={isSubmitting}
          />
          <CustomInput<ContactFormData>
            label="Company Name (Optional)"
            name="company"
            register={register}
            placeholder="ACME Inc."
            validationError={errors.company?.message}
            disabled={isSubmitting}
          />
          <CustomInput<ContactFormData>
            label="Message"
            name="message"
            register={register}
            placeholder="Tell us a little about your safety needs..."
            validationError={errors.message?.message}
            multiline
            rows={4}
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <CustomButton
              title="Submit Request"
              type="submit"
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
