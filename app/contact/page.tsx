import { ContactPageContent } from '@/components/contact/contact-page-content';

export const metadata = {
  title: 'Contact Us | Your Safety Partners',
  description:
    'Get in touch with our team to book a demo or learn more about our safety compliance software.',
};

export const revalidate = 3600;

export default function ContactPage() {
  return <ContactPageContent />;
}
