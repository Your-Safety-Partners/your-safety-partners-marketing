import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type WhoIsItForProps = SliceComponentProps<Content.WhyChooseUsSlice>;

const defaultSectionTitle = 'Built for the people running the site.';

const defaultSectionSubtitle =
  'Your Safety Portal is built for the people who have safety as part of their job, not just for safety specialists. If you run a site, a warehouse, a fleet, or a team, it is built for you. And if you are a safety specialist, the depth is there when you need it.';

const sectionSubtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base font-normal leading-relaxed text-gray-500 md:text-lg">{children}</p>
  ),
};

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base font-normal leading-relaxed text-gray-500">{children}</p>
  ),
};

/** Figma: linear TL → BR, #EDEBFF → #FFFFFF (inner content card only). */
const CONTENT_CARD_GRADIENT = 'bg-gradient-to-br from-[#EDEBFF] to-white';

const toLucideIconKey = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';

  return trimmed
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
};

const resolveCardIcon = (iconName: string | null | undefined): LucideIcon | null => {
  const normalized = iconName?.trim();
  if (!normalized) return null;

  const candidateKeys = [normalized, toLucideIconKey(normalized)];

  for (const key of candidateKeys) {
    const icon = (LucideIcons as Record<string, unknown>)[key];
    if (icon) {
      return icon as LucideIcon;
    }
  }

  return null;
};

const WhoIsItFor: FC<WhoIsItForProps> = ({ slice }) => {
  const { section_title, section_subtitle, who_is_it_for_items } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const listRows = (who_is_it_for_items ?? []).filter((row) => {
    const hasTitle = Boolean(row.position_title?.trim());
    const hasDescription = isFilled.richText(row.description);
    return hasTitle || hasDescription;
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-12 lg:py-12')}
      aria-labelledby="who-is-it-for-heading"
    >
      <SliceEntrance>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
          <div
            className={cn(
              'rounded-[24px] p-6 md:p-10 lg:p-12 xl:p-14',
              CONTENT_CARD_GRADIENT
            )}
          >
            <h2
              id="who-is-it-for-heading"
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
                Add cards in the Who is it for items group: a position title and description for
                each role.
              </p>
            ) : (
              <ul className="mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10">
                {listRows.map((row, index) => {
                  const position = row.position_title?.trim() ?? '';
                  const key = `who-is-it-for-${index}`;
                  const CardIcon = resolveCardIcon(row.card_icon);

                  return (
                    <li
                      key={key}
                      className="rounded-xl border border-gray-100 bg-white/90 p-4 text-left shadow-sm sm:p-5"
                    >
                      <div className="flex gap-3">
                        {/* <span
                          className="mt-1 block min-h-[3rem] w-1 shrink-0 self-stretch rounded-full bg-violet-700"
                          aria-hidden
                        /> */}
                        <div className="min-w-0 flex-1 space-y-2">
                          {CardIcon ? (
                            <CardIcon className="h-7 w-6 text-violet-700" aria-hidden />
                          ) : null}
                          {position ? (
                            <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-800">
                              {position}
                            </h3>
                          ) : null}
                          {isFilled.richText(row.description) ? (
                            <div className="[&_p+p]:mt-2">
                              <PrismicRichText
                                field={row.description}
                                components={descriptionComponents}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </SliceEntrance>
    </section>
  );
};

export default WhoIsItFor;
