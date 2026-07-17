import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FileLock2, ShieldCheck } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `PrivacyPolicy`.
 */
export type PrivacyPolicyProps =
  SliceComponentProps<Content.PrivacyPolicySlice>;

/**
 * Component for "PrivacyPolicy" Slices.
 */
const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ slice }) => {
  const title = slice.primary.page_title?.trim() || 'Privacy Policy';
  const headingId = `privacy-policy-heading-${slice.id ?? 'privacy-policy'}`;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        inter.className,
        'relative isolate overflow-hidden bg-gray-50 py-14 md:py-20 lg:py-24'
      )}
      aria-labelledby={headingId}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top,rgba(109,40,217,0.12),transparent_68%)]"
      />

      <SliceEntrance>
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-10">
          <header className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700 md:text-sm">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Privacy &amp; data protection
            </div>

            <h1
              id={headingId}
              className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
            >
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              How Your Safety Partners handles, protects, and respects your personal information.
            </p>
          </header>

          <Card className="mt-10 overflow-hidden rounded-2xl border-gray-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.28)] md:mt-14">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-violet-50/60 px-5 py-4 md:px-8">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-700 text-white">
                <FileLock2 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Your privacy matters</p>
                <p className="text-sm text-gray-600">
                  Please read this policy carefully.
                </p>
              </div>
            </div>

            <CardContent className="p-5 md:p-8 lg:p-10">
              <div className="prose prose-slate max-w-none prose-headings:scroll-mt-28 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-7 prose-p:text-gray-600 prose-a:font-medium prose-a:text-violet-700 prose-a:decoration-violet-300 prose-a:underline-offset-4 hover:prose-a:text-violet-800 prose-strong:text-gray-900 prose-li:marker:text-violet-600 prose-img:rounded-xl">
                <PrismicRichText field={slice.primary.page_content} />
              </div>
            </CardContent>
          </Card>
        </div>
      </SliceEntrance>
    </section>
  );
};

export default PrivacyPolicy;
