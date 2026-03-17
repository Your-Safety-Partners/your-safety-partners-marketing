import { ContactForm } from '@/components/forms/contact-form';

export const metadata = {
  title: 'Contact Us | Your Safety Partners',
  description: 'Get in touch with our team to book a demo or learn more about our safety compliance software.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Let&apos;s Talk</h1>
        <p className="text-lg text-muted-foreground">
          Whether you have a question, want a demo, or need help with a safety plan, we are ready to help.
        </p>
      </div>
      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}
