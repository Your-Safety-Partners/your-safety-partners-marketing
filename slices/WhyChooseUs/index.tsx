import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Check } from 'lucide-react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type WhyChooseUsProps = SliceComponentProps<Content.WhyChooseUsSlice>;

const defaultSectionTitle = 'Why Choose Your Safety Partners?';

const defaultSectionSubtitle =
  "We're committed to creating safer workplaces through expert guidance, comprehensive solutions, and ongoing support.";

const sectionSubtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base font-normal leading-relaxed text-gray-500 md:text-lg">{children}</p>
  ),
};

const listItemComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base font-normal leading-relaxed text-gray-600">{children}</p>
  ),
};

/** Figma: linear TL → BR, #EDEBFF → #FFFFFF (inner content card only). */
const CONTENT_CARD_GRADIENT = 'bg-gradient-to-br from-[#EDEBFF] to-white';

const IMAGE_SHADOW_CLASS = 'shadow-[0_4px_8px_rgba(0,0,0,0.1)]';

const IMAGE_FRAME_CLASS = cn(
  'overflow-hidden rounded-3xl bg-white',
  IMAGE_SHADOW_CLASS
);

const WhyChooseUs: FC<WhyChooseUsProps> = ({ slice }) => {
  const {
    section_title,
    section_subtitle,
    collage_image_back,
    collage_image_front,
    why_choose_us_items,
  } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const listRows = (why_choose_us_items ?? []).filter((row) =>
    isFilled.richText(row.why_choose_us_item)
  );

  const hasBack = isFilled.image(collage_image_back);
  const hasFront = isFilled.image(collage_image_front);
  const hasCollage = hasBack || hasFront;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-12 lg:py-12')}
      aria-labelledby="why-choose-us-heading"
    >
      <SliceEntrance>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div
          className={cn(
            'rounded-[24px] p-6 md:p-10 lg:p-12 xl:p-14',
            CONTENT_CARD_GRADIENT
          )}
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
            <h2
              id="why-choose-us-heading"
              className="text-3xl font-bold leading-snug tracking-tight text-gray-800"
            >
              {heading}
            </h2>
            <div className="mt-3 [&_p+p]:mt-3">
              {isFilled.richText(section_subtitle) ? (
                <PrismicRichText
                  field={section_subtitle}
                  components={sectionSubtitleComponents}
                />
              ) : (
                <p className="text-base font-normal leading-relaxed text-gray-500 md:text-lg">
                  {defaultSectionSubtitle}
                </p>
              )}
            </div>

            {listRows.length === 0 ? (
              <p className="mt-8 text-sm text-gray-500">
                Add benefit items in the Why Choose Us slice (Why Choose Us group).
              </p>
            ) : (
              <ul className="mt-8 list-none space-y-4">
                {listRows.map((row, index) => {
                  const icon = row.card_icon;
                  const key = `why-item-${index}`;

                  return (
                    <li key={key} className="flex gap-[12px] text-left">
                      <span className="mt-0.5 shrink-0" aria-hidden>
                        {isFilled.image(icon) ? (
                          // eslint-disable-next-line @next/next/no-img-element -- Prismic item icon
                          <img
                            src={icon.url ?? ''}
                            alt={icon.alt ?? ''}
                            width={20}
                            height={20}
                            className="size-5 object-contain"
                            draggable={false}
                          />
                        ) : (
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-violet-700 text-violet-700">
                            <Check className="size-3" strokeWidth={3} aria-hidden />
                          </span>
                        )}
                      </span>
                      <div className="min-w-0 flex-1 [&_p+p]:mt-2">
                        <PrismicRichText
                          field={row.why_choose_us_item}
                          components={listItemComponents}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            </div>

            <div className="flex w-full justify-center lg:justify-end">
              {hasCollage ? (
                <div
                  className={cn(
                    'flex w-full max-w-md items-start justify-center sm:max-w-lg lg:max-w-none lg:justify-end',
                    hasBack && hasFront ? 'gap-3 sm:gap-4' : 'gap-0'
                  )}
                >
                  {hasBack ? (
                    <div
                      className={cn(
                        'relative z-0 w-[min(46%,220px)] shrink-0 sm:w-[min(44%,260px)] md:w-[min(42%,280px)]',
                        IMAGE_FRAME_CLASS
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Prismic collage */}
                      <img
                        src={collage_image_back.url ?? ''}
                        alt={collage_image_back.alt ?? ''}
                        width={collage_image_back.dimensions?.width}
                        height={collage_image_back.dimensions?.height}
                        className="aspect-[3/4] h-full w-full object-cover"
                        sizes="(max-width: 640px) 46vw, 280px"
                        draggable={false}
                      />
                    </div>
                  ) : null}
                  {hasFront ? (
                    <div
                      className={cn(
                        'relative z-10 w-[min(46%,220px)] shrink-0 sm:w-[min(44%,260px)] md:w-[min(42%,280px)]',
                        IMAGE_FRAME_CLASS,
                        hasBack &&
                          '-ml-5 mt-[clamp(3.5rem,14vw,6.5rem)] sm:-ml-6 md:-ml-8'
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Prismic collage */}
                      <img
                        src={collage_image_front.url ?? ''}
                        alt={collage_image_front.alt ?? ''}
                        width={collage_image_front.dimensions?.width}
                        height={collage_image_front.dimensions?.height}
                        className="aspect-[3/4] h-full w-full object-cover"
                        sizes="(max-width: 640px) 46vw, 280px"
                        draggable={false}
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="w-full max-w-md rounded-3xl border border-dashed border-violet-300/80 bg-white/50 p-8 text-center text-sm text-gray-500">
                  Add Collage Image (Back) and Collage Image (Front) in Prismic for the photo
                  layout.
                </p>
              )}
            </div>
          </div>
        </div>
        </div>
      </SliceEntrance>
    </section>
  );
};

export default WhyChooseUs;
