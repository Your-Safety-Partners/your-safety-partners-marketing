import { FC, type ReactNode } from 'react';
import Link from 'next/link';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ChevronRight } from 'lucide-react';

import { SliceEntrance, SliceEntranceGroup } from '@/components/slices/slice-entrance';
import { Button } from '@/components/ui/button';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type HowWeCanWelpProps = SliceComponentProps<Content.HowWeCanWelpSlice>;

const defaultTitle = 'How We Can Help';

const DEFAULT_PARAGRAPHS = [
  'Your Safety Partners delivers practical WHS consulting and tools that fit how your business actually works — so compliance strengthens operations instead of slowing them down.',
  'We help you identify risk early, embed clear processes, and upskill your teams with documentation, training context, and ongoing guidance you can rely on.',
  'Whether you need a focused assessment or long-term support, we partner with you to build a safer, more confident workplace.',
] as const;

const STAGGER_MS = 85;

const IMAGE_SHADOW = 'shadow-[0_4px_8px_rgba(0,0,0,0.1)]';

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base font-normal leading-relaxed text-gray-600">{children}</p>
  ),
};

const HowWeCanWelp: FC<HowWeCanWelpProps> = ({ slice }) => {
  const { section_title, section_description, section_image } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultTitle;

  const hasImage = isFilled.image(section_image);
  const hasDescription = isFilled.richText(section_description);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'overflow-x-hidden bg-gray-50 py-16 md:py-20 lg:py-24')}
      aria-labelledby="how-we-can-help-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <SliceEntranceGroup className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <SliceEntrance
            from="left"
            delayMs={0}
            className="flex h-full min-h-[280px] w-full lg:min-h-0"
          >
            <div
              className={cn(
                'flex h-full min-h-[280px] w-full flex-col overflow-hidden rounded-2xl bg-white lg:min-h-0',
                IMAGE_SHADOW
              )}
            >
              {hasImage ? (
                // eslint-disable-next-line @next/next/no-img-element -- Prismic section image
                <img
                  src={section_image.url ?? ''}
                  alt={section_image.alt ?? ''}
                  width={section_image.dimensions?.width}
                  height={section_image.dimensions?.height}
                  className="min-h-0 w-full flex-1 object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  draggable={false}
                />
              ) : (
                <div className="flex min-h-[280px] flex-1 items-center justify-center bg-gray-100 px-6 text-center text-sm text-gray-500">
                  Add a Section Image in the How We Can Help slice in Prismic.
                </div>
              )}
            </div>
          </SliceEntrance>

          <div className="flex min-h-0 flex-col">
            <SliceEntrance from="right" delayMs={0 * STAGGER_MS}>
              <h2
                id="how-we-can-help-heading"
                className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
              >
                {heading}
              </h2>
            </SliceEntrance>

            <SliceEntrance from="right" delayMs={1 * STAGGER_MS}>
              <div className="mt-6 space-y-4">
                {hasDescription ? (
                  <div className="[&_p+p]:mt-4">
                    <PrismicRichText
                      field={section_description}
                      components={descriptionComponents}
                    />
                  </div>
                ) : (
                  DEFAULT_PARAGRAPHS.map((text, index) => (
                    <p
                      key={index}
                      className="text-base font-normal leading-relaxed text-gray-600"
                    >
                      {text}
                    </p>
                  ))
                )}
              </div>
            </SliceEntrance>

            <SliceEntrance from="right" delayMs={2 * STAGGER_MS}>
              <div className="mt-8">
                <Button
                  asChild
                  className="h-auto rounded-lg bg-violet-700 p-0 text-base font-medium text-white shadow-none hover:bg-violet-700/90"
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 !py-[10px] !pl-[20px] !pr-[16px]"
                  >
                    Learn More About Us
                    <ChevronRight className="size-5 shrink-0" aria-hidden />
                  </Link>
                </Button>
              </div>
            </SliceEntrance>
          </div>
        </SliceEntranceGroup>
      </div>
    </section>
  );
};

export default HowWeCanWelp;
