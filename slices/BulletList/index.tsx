import { FC, type ReactNode } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `BulletList`.
 */
export type BulletListProps = SliceComponentProps<Content.BulletListSlice>;

const defaultSectionTitle = 'Inspection checklist';
const defaultSectionSubtitle =
  'Use this checklist to verify your team is inspection-ready and aligned with current safety requirements.';

const subtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-slate-600 md:text-lg">{children}</p>
  ),
};

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm leading-relaxed text-slate-600 md:text-base">{children}</p>
  ),
};

const BulletList: FC<BulletListProps> = ({ slice }) => {
  const { section_title, section_subtitle, bullet_list } = slice.primary;
  const items = Array.isArray(bullet_list) ? bullet_list : [];

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20')}
      aria-labelledby="inspection-checklist-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:p-10">
            <header className="mx-auto max-w-3xl text-center">
              <h2
                id="inspection-checklist-heading"
                className="text-3xl font-bold tracking-tight text-[#337cf3] md:text-4xl"
              >
                {heading}
              </h2>
              <div className="mt-4">
                {isFilled.richText(section_subtitle) ? (
                  <div className="[&_p+p]:mt-3">
                    <PrismicRichText
                      field={section_subtitle}
                      components={subtitleComponents}
                    />
                  </div>
                ) : (
                  <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                    {defaultSectionSubtitle}
                  </p>
                )}
              </div>
            </header>

            {items.length === 0 ? (
              <p className="mt-10 text-center text-sm text-slate-500">
                Add checklist items in the Bullet List slice.
              </p>
            ) : (
              <ul className="mt-10 space-y-3 md:space-y-4">
                {items.map((item, index) => {
                  const title = item.item_title?.trim() ?? '';
                  const hasDescription = isFilled.richText(item.item_description);

                  return (
                    <li
                      key={`inspection-checklist-item-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-5"
                    >
                      <div className="flex items-start gap-3">
                        <CircleCheckBig
                          className="mt-0.5 size-5 shrink-0 text-violet-700"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          {title ? (
                            <h3 className="text-base font-semibold leading-snug text-slate-900 md:text-lg">
                              {title}
                            </h3>
                          ) : null}
                          {hasDescription ? (
                            <div className={cn(title ? 'mt-1.5' : '')}>
                              <PrismicRichText
                                field={item.item_description}
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
    </section>
  );
};

export default BulletList;
