import { ContactPageContent } from '@/components/contact/contact-page-content';
import { PAGE_SEO, pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('/contact', PAGE_SEO.contact);

export const revalidate = 3600;

export default function ContactPage() {
  return <ContactPageContent />;
}
