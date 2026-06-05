import { BookADemoContent } from '@/components/book-a-demo/book-a-demo-content';

export const metadata = {
  title: 'Book a Demo | Your Safety Partners',
  description:
    'Schedule a 30-minute live walkthrough of Your Safety Partners. See compliance, training, and safety workflows tailored to your business.',
};

export const revalidate = 3600;

export default function BookADemoPage() {
  return <BookADemoContent />;
}
