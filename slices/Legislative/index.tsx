import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type LegislativeProps = SliceComponentProps<Content.LegislativeSlice>;

const defaultSectionTitle = 'WHS Legislative Alignment';
const defaultSectionDescription =
  'A complete compliance cycle that aligns with Workplace Health and Safety regulations.';

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500">{children}</p>
  ),
};

const Legislative: FC<LegislativeProps> = ({ slice }) => {
  const { section_title, section_subtitle, whs_image } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20 lg:py-24')}
      aria-labelledby="legislative-section-heading"
    >
      <SliceEntrance>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="legislative-section-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            {heading}
          </h2>
          <div className="mt-4 [&_p+p]:mt-3">
            {isFilled.richText(section_subtitle) ? (
              <PrismicRichText
                field={section_subtitle}
                components={descriptionComponents}
              />
            ) : (
              <p className="text-base leading-relaxed text-gray-500 md:text-lg md:text-lg">
                {defaultSectionDescription}
              </p>
            )}
          </div>
        </header>

        <div className="mt-10 flex w-full justify-center md:mt-14">
          {isFilled.image(whs_image) ? (
            // eslint-disable-next-line @next/next/no-img-element -- Prismic WHS diagram asset
            <img
              src={whs_image.url ?? ''}
              alt={whs_image.alt ?? 'WHS compliance cycle diagram'}
              width={whs_image.dimensions?.width}
              height={whs_image.dimensions?.height}
              className="h-auto w-full object-contain object-center"
              sizes="(max-width: 1238px) 100vw, 1238px"
              draggable={false}
            />
          ) : (
            <p className="text-center text-sm text-gray-500">
              Add the WHS diagram in Prismic (WHS Image field).
            </p>
          )}
        </div>
        </div>
      </SliceEntrance>
    </section>
  );
};

export default Legislative;
