import { FC } from 'react';
import Link from 'next/link';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { Phone } from 'lucide-react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { Button } from '@/components/ui/button';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

const defaultSectionTitle = 'What are you waiting for?';

const defaultSectionSubtitle =
  'Join hundreds of businesses who trust us to keep their workplaces safe and compliant';

const defaultStats: ReadonlyArray<{ number: string; description: string }> = [
  { number: '30+', description: 'Industries Serviced' },
  { number: '1000+', description: 'Course Delivered' },
  { number: '10,000+', description: 'Risk Assessments Completed' },
  { number: '100+', description: 'Happy Clients' },
];

const CTA_LABEL = 'Contact Us for a FREE Consultation';
const CTA_HREF = '/contact';

const SECTION_BG = 'bg-gray-900';
const ACCENT = 'text-violet-600';

type StatsItem = NonNullable<Content.CallToActionSliceDefaultPrimary['stats']>[number];

function hasStatContent(row: StatsItem): boolean {
  return Boolean(row.number?.trim() && row.description?.trim());
}

const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  const { section_title, section_subtitle, stats } = slice.primary;

  const title =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const subtitle =
    section_subtitle?.trim() && section_subtitle.trim().length > 0
      ? section_subtitle.trim()
      : defaultSectionSubtitle;

  const fromCms = (stats ?? []).filter(hasStatContent).map((row) => ({
    number: row.number!.trim(),
    description: row.description!.trim(),
  }));

  const displayStats = fromCms.length > 0 ? fromCms : [...defaultStats];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, SECTION_BG, 'py-16 md:py-20 lg:py-24')}
      aria-labelledby="call-to-action-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <SliceEntrance from="left" className="flex flex-col items-center text-center">
          <h2
            id="call-to-action-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            {title}
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-gray-400 md:text-lg">
            {subtitle}
          </p>

          <ul
            className="mt-12 grid w-full grid-cols-2 gap-8 md:mt-14 md:grid-cols-4 md:gap-6 lg:gap-10"
            aria-label="Key statistics"
          >
            {displayStats.map((item) => (
              <li key={`${item.number}-${item.description}`} className="flex flex-col items-center">
                <span
                  className={cn(
                    'text-3xl font-bold tabular-nums md:text-4xl lg:text-[2.75rem] lg:leading-none',
                    ACCENT
                  )}
                >
                  {item.number}
                </span>
                <span className="mt-2 text-xs font-normal leading-snug text-gray-400 md:text-sm">
                  {item.description}
                </span>
              </li>
            ))}
          </ul>

          <Button
            asChild
            className={cn(
              'mt-12 h-auto rounded-xl border-0 !pl-5 !pr-4 !py-2.5 text-base font-medium shadow-none',
              'bg-violet-600 text-white hover:bg-violet-500',
              'focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e14]',
              'md:mt-14 md:px-9 md:py-4'
            )}
          >
            <Link href={CTA_HREF} className="inline-flex items-center gap-2.5">
              <Phone className="size-5 shrink-0 stroke-[2]" aria-hidden />
              {CTA_LABEL}
            </Link>
          </Button>
        </SliceEntrance>
      </div>
    </section>
  );
};

export default CallToAction;
