import { FC } from 'react';
import Image from 'next/image';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `AboutJohn`.
 */
export type AboutJohnProps = SliceComponentProps<Content.AboutJohnSlice>;

/**
 * Component for "AboutJohn" Slices.
 */
const AboutJohn: FC<AboutJohnProps> = ({ slice }) => {
  const { eyebrow_text, section_title, section_subtitle, section_description, john_image } =
    slice.primary;
  const hasImage = isFilled.image(john_image);
  const imageUrl = hasImage ? (john_image.url?.split('?')[0] ?? john_image.url ?? '') : '';
  const imageAlt = hasImage ? (john_image.alt ?? 'John portrait') : 'John portrait';

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20')}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            {hasImage ? (
              <div className="relative h-full min-h-[280px]">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-violet-100" />
                <div className="relative h-full overflow-hidden rounded-2xl border border-violet-100 bg-white">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[280px] rounded-2xl border border-dashed border-violet-200 bg-white/90" />
            )}
          </div>

          <div className="min-w-0">
            {eyebrow_text?.trim() ? (
              <p className="inline-flex w-fit rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase text-violet-700 md:text-sm">
                {eyebrow_text}
              </p>
            ) : null}

            {section_title?.trim() ? (
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {section_title}
              </h2>
            ) : null}

            {isFilled.richText(section_subtitle) ? (
              <div className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg [&_p+p]:mt-3">
                <PrismicRichText field={section_subtitle} />
              </div>
            ) : null}

            {isFilled.richText(section_description) ? (
              <div className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
                <PrismicRichText field={section_description} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJohn;
