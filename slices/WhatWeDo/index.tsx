import { FC } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { BriefcaseBusiness } from 'lucide-react';

import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `WhatWeDo`.
 */
export type WhatWeDoProps = SliceComponentProps<Content.WhatWeDoSlice>;

/**
 * Component for "WhatWeDo" Slices.
 */
const WhatWeDo: FC<WhatWeDoProps> = ({ slice }) => {
  const { section_title, section_subtitle, bento_box_cards } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20')}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            {section_title}
          </h2>
          {isFilled.richText(section_subtitle) ? (
            <div className="mt-4 text-base leading-relaxed text-gray-500 md:text-lg [&_p+p]:mt-3">
              <PrismicRichText field={section_subtitle} />
            </div>
          ) : null}
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {bento_box_cards.slice(0, 6).map((card, index) => {
            const isWide = index === 0 || index === 3;

            return (
              <li
                key={`what-we-do-card-${index}`}
                className={cn(isWide && 'md:col-span-2')}
              >
                <article className="h-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm md:p-7">
                  <div className="mb-4">
                    {isFilled.image(card.card_icon) ? (
                      // eslint-disable-next-line @next/next/no-img-element -- Prismic card icon
                      <img
                        src={card.card_icon.url ?? ''}
                        alt={card.card_icon.alt ?? ''}
                        width={24}
                        height={24}
                        className="size-12 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <BriefcaseBusiness className="size-6 text-slate-700" aria-hidden />
                    )}
                  </div>

                  {card.card_title?.trim() ? (
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                      {card.card_title}
                    </h3>
                  ) : null}

                  {isFilled.richText(card.card_description) ? (
                    <div className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base [&_p+p]:mt-2">
                      <PrismicRichText field={card.card_description} />
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WhatWeDo;
