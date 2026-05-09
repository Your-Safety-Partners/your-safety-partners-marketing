import { FC } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `OurMission`.
 */
export type OurMissionProps = SliceComponentProps<Content.OurMissionSlice>;

/**
 * Component for "OurMission" Slices.
 */
const OurMission: FC<OurMissionProps> = ({ slice }) => {
  const cards = slice.primary.card;

  if (cards.length === 0) {
    return null;
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-24')}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="space-y-6">
          {cards.map((card, index) => {
            const { card_eyebrow_text, card_title, card_subtitle, card_description } = card;

            return (
              <div
                key={`${card_title}-${index}`}
                className="relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 shadow-sm md:p-10 lg:p-12"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

                <div className="relative mx-auto text-center">
                  <div>
                    <p className="inline-flex w-fit bg-violet-100 rounded-full px-3 py-1.5 text-xs font-semibold uppercase text-violet-700 md:text-sm">
                      {card_eyebrow_text}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                      {card_title}
                    </h2>

                    {isFilled.richText(card_subtitle) ? (
                      <div className="mt-2 text-base leading-relaxed text-gray-700 md:text-lg [&_p+p]:mt-3">
                        <PrismicRichText field={card_subtitle} />
                      </div>
                    ) : null}

                    {isFilled.richText(card_description) ? (
                      <div className="mx-auto mt-8 text-sm leading-relaxed text-gray-500 md:text-base [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-left">
                        <PrismicRichText field={card_description} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
