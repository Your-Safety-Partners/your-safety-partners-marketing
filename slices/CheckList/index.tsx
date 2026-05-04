import { FC, type ReactNode } from 'react';
import Image from 'next/image';
import { CircleCheckBig } from 'lucide-react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `BulletList`.
 */
export type BulletListProps = SliceComponentProps<Content.BulletListSlice> & {
  index?: number;
  slices?: readonly { slice_type: string }[];
};

const defaultSectionTitle = 'Inspection checklist';
const defaultSectionSubtitle =
  'Use this checklist to verify your team is inspection-ready and aligned with current safety requirements.';

const subtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm leading-relaxed text-slate-600 md:text-base">{children}</p>
  ),
};

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-xs leading-relaxed text-slate-600 md:text-sm">{children}</p>
  ),
};

const imagePlaceholderComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="px-6 text-center text-sm text-slate-500">{children}</p>
  ),
};

function countPreviousBulletLists(
  slices: readonly { slice_type: string }[] | undefined,
  currentIndex: number
): number {
  if (!slices || currentIndex <= 0) return 0;
  let n = 0;
  for (let i = 0; i < currentIndex; i++) {
    if (slices[i]?.slice_type === 'bullet_list') n += 1;
  }
  return n;
}

const BulletList: FC<BulletListProps> = ({ slice, index = 0, slices }) => {
  const { section_title, section_subtitle, section_image, section_image_placeholder, check_list } =
    slice.primary;
  const items = Array.isArray(check_list) ? check_list : [];

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const ordinal = countPreviousBulletLists(slices, index);
  /** First checklist: image left; second: image right; then repeats. */
  const imageOnLeft = ordinal % 2 === 0;

  const headingId = `inspection-checklist-heading-${slice.id ?? index}`;
  const hasImage = isFilled.image(section_image);
  const imageUrl = hasImage ? (section_image.url?.split('?')[0] ?? section_image.url ?? '') : '';
  const imageAlt = hasImage ? (section_image.alt ?? '') : '';
  const imageWidth = hasImage ? (section_image.dimensions?.width ?? 1200) : 1200;
  const imageHeight = hasImage ? (section_image.dimensions?.height ?? 900) : 900;

  const imageBlock = (
    <div
      className={cn(
        'relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none',
        !hasImage &&
          'flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 lg:min-h-[320px]'
      )}
    >
      {hasImage ? (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
          <Image
            src={imageUrl}
            alt={imageAlt || 'Section illustration'}
            width={imageWidth}
            height={imageHeight}
            unoptimized
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      ) : (
        <>
          {isFilled.richText(section_image_placeholder) ? (
            <PrismicRichText
              field={section_image_placeholder}
              components={imagePlaceholderComponents}
            />
          ) : (
            <p className="px-6 text-center text-sm text-slate-500">
              Add a section image in Prismic to show it here.
            </p>
          )}
        </>
      )}
    </div>
  );

  const contentBlock = (
    <div className="flex flex-col">
      <header className="text-left">
        <h2
          id={headingId}
          className="text-2xl font-bold tracking-tight text-gray-700 md:text-3xl"
        >
          {heading}
        </h2>
        <div className="mt-3 max-w-xl">
          {isFilled.richText(section_subtitle) ? (
            <div className="[&_p+p]:mt-3">
              <PrismicRichText field={section_subtitle} components={subtitleComponents} />
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">{defaultSectionSubtitle}</p>
          )}
        </div>
      </header>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">Add checklist items in the Check List slice.</p>
      ) : (
        <ul className="mt-6 space-y-4 md:mt-8 md:space-y-4">
          {items.map((item, itemIndex) => {
            const title = item.item_title?.trim() ?? '';
            const hasDescription = isFilled.richText(item.item_description);

            return (
              <li key={`inspection-checklist-item-${itemIndex}`} className="flex gap-3">
                <CircleCheckBig
                  className="mt-0.5 size-4 shrink-0 text-violet-600"
                  aria-hidden
                />
                <div className="min-w-0">
                  {title ? (
                    <h3 className="text-sm font-semibold leading-snug text-slate-900 md:text-base">{title}</h3>
                  ) : null}
                  {hasDescription ? (
                    <div className={cn(title ? 'mt-1' : '')}>
                      <PrismicRichText field={item.item_description} components={descriptionComponents} />
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20')}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div
            className={cn(
              'order-1 min-w-0',
              imageOnLeft ? 'lg:order-2' : 'lg:order-1'
            )}
          >
            {contentBlock}
          </div>
          <div
            className={cn(
              'order-2 min-w-0',
              imageOnLeft ? 'lg:order-1' : 'lg:order-2'
            )}
          >
            {imageBlock}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulletList;
