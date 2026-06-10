import { ContactForm } from '@/components/forms/contact-form';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export function ContactPageContent() {
  return (
    <section className={cn(inter.className, 'bg-[#f9fafb] py-14 md:py-20 lg:py-24')}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-md bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-800">
            Contact us
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Our team is ready to assist you
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Whether you have a question, want a demo, or need help with a safety plan, we&apos;re
            here to help you create a safer, compliant workplace.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
