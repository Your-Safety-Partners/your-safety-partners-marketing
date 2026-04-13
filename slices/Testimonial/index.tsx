import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Star } from 'lucide-react';

import { SliceEntrance, SliceEntranceGroup } from '@/components/slices/slice-entrance';
import { Card, CardContent } from '@/components/ui/card';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

const defaultSectionTitle = 'What Our Clients Say';
const defaultSectionSubtitle =
  'Real feedbacks from using the platform in day-to-day safety operations.';

const CARD_STAGGER_MS = 100;

const titleComponents = {
  heading1: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{children}</h2>
  ),
  heading2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{children}</h2>
  ),
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{children}</p>
  ),
};

const subtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500 md:text-lg">{children}</p>
  ),
};

const quoteComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500 italic md:text-base">{children}</p>
  ),
};

const authorComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm font-semibold text-gray-900">{children}</p>
  ),
};

const roleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm leading-snug text-gray-500">{children}</p>
  ),
};

function getStarCount(value: Content.TestimonialSliceDefaultPrimaryItemsItem['stars']): number {
  if (value === null || value === undefined) return 5;
  const n = Number(value);
  if (Number.isNaN(n)) return 5;
  return Math.min(5, Math.max(0, Math.round(n)));
}

function StarRating({ count }: { count: number }) {
  return (
    <div
      className="mb-5 flex gap-0.5"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4 shrink-0',
            i < count
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

const Testimonial: FC<TestimonialProps> = ({ slice }) => {
  const { section_title, section_subtitle, items } = slice.primary;
  const rows = (items ?? []).filter((item) => isFilled.richText(item.quote));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'overflow-x-hidden bg-gray-50 py-16 md:py-24 lg:py-28')}
      aria-labelledby="testimonials-heading"
    >
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <SliceEntranceGroup>
          <SliceEntrance from="left" delayMs={0} className="w-full">
            <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
              <div id="testimonials-heading" className="[&_h2+p]:mt-0 [&_p+p]:mt-2">
                {isFilled.richText(section_title) ? (
                  <PrismicRichText field={section_title} components={titleComponents} />
                ) : (
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                    {defaultSectionTitle}
                  </h2>
                )}
              </div>
              <div className="mt-3 text-pretty md:mt-4">
                {isFilled.richText(section_subtitle) ? (
                  <PrismicRichText
                    field={section_subtitle}
                    components={subtitleComponents}
                  />
                ) : (
                  <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                    {defaultSectionSubtitle}
                  </p>
                )}
              </div>
            </header>
          </SliceEntrance>

          {rows.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              Add testimonial items with quotes in the Testimonial slice in Prismic.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((item, index) => (
                <li key={index}>
                  <SliceEntrance
                    from="left"
                    delayMs={(index + 1) * CARD_STAGGER_MS}
                    className="h-full"
                  >
                    <Card
                      className={cn(
                        'h-full rounded-xl border border-gray-200 bg-white shadow-none',
                        'transition-shadow duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.06)]'
                      )}
                    >
                      <CardContent className="flex h-full flex-col p-6 md:p-7">
                        <StarRating count={getStarCount(item.stars)} />

                        <div className="flex-1 text-left [&_p]:mb-0 [&_p+p]:mt-3">
                          <PrismicRichText field={item.quote} components={quoteComponents} />
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                          {isFilled.richText(item.author) ? (
                            <PrismicRichText
                              field={item.author}
                              components={authorComponents}
                            />
                          ) : (
                            <p className="text-sm font-semibold text-gray-900">Anonymous</p>
                          )}
                          {isFilled.richText(item.role) ? (
                            <div className="mt-1 [&_p]:mb-0 [&_p+p]:mt-1">
                              <PrismicRichText
                                field={item.role}
                                components={roleComponents}
                              />
                            </div>
                          ) : null}
                          {item.company?.trim() ? (
                            <p className="mt-1 text-sm text-gray-500">{item.company.trim()}</p>
                          ) : null}
                        </div>
                      </CardContent>
                    </Card>
                  </SliceEntrance>
                </li>
              ))}
            </ul>
          )}
        </SliceEntranceGroup>
      </div>
    </section>
  );
};

export default Testimonial;
