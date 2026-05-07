import { FC } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `TimelineSection`.
 */
export type TimelineSectionProps =
  SliceComponentProps<Content.TimelineSectionSlice>;

/**
 * Component for "TimelineSection" Slices.
 */
const TimelineSection: FC<TimelineSectionProps> = ({ slice }) => {
  const { section_title, section_subtitle, timeline } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'relative overflow-hidden bg-gray-50 py-16 md:py-24')}
    >
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            {section_title}
          </h2>
          {isFilled.richText(section_subtitle) ? (
            <div className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg [&_p+p]:mt-3">
              <PrismicRichText field={section_subtitle} />
            </div>
          ) : null}
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl md:mt-16">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-200 via-violet-700 to-violet-200 md:block" />

          <ul className="space-y-6 md:space-y-8">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li key={`timeline-item-${index}`} className="relative md:grid md:grid-cols-2 md:gap-10">
                  <div className={cn('md:col-start-1', !isLeft && 'md:col-start-2')}>
                    <article className="relative rounded-2xl border border-violet-200 bg-white p-5 shadow-sm md:p-6">
                      <p className="text-xl font-extrabold leading-none text-violet-700">
                        {item.year}
                      </p>
                      <div className="mt-2 text-lg font-semibold leading-tight text-slate-900 [&_p]:m-0">
                        <PrismicRichText field={item.title} />
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600 md:text-[0.95rem] [&_p+p]:mt-2">
                        <PrismicRichText field={item.description} />
                      </div>
                    </article>
                  </div>

                  <span className="pointer-events-none absolute left-1/2 top-8 hidden size-3 -translate-x-1/2 rounded-full border-2 border-violet-700 bg-white md:block" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
