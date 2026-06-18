import { BookADemoContent } from '@/components/book-a-demo/book-a-demo-content';
import { PAGE_SEO, pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('/book-a-demo', PAGE_SEO['book-a-demo']);

export const revalidate = 3600;

export default function BookADemoPage() {
  return <BookADemoContent />;
}
