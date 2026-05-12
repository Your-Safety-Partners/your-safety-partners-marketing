import { FC, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { asLink, Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { Button } from '@/components/ui/button';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type SubpageHeroSectionProps =
  SliceComponentProps<Content.SubpageHeroSectionSlice>;

type SubpageLink = Content.SubpageHeroSectionSliceDefaultPrimary['primary_cta'];

const defaultTitle = 'Module overview';

const PRIMARY_DEFAULT_HREF = '/contact';
const PRIMARY_DEFAULT_LABEL = 'Book a demo';
const SECONDARY_DEFAULT_HREF = '/pricing';
const SECONDARY_DEFAULT_LABEL = 'See pricing';

function labelFromLinkField(field: SubpageLink, fallback: string): string {
  if (field != null && typeof field === 'object' && 'text' in field) {
    const raw = (field as { text?: string | null }).text;
    const trimmed = raw?.trim();
    if (trimmed) return trimmed;
  }
  return fallback;
}

function hrefFromLinkField(field: SubpageLink, fallback: string): string {
  return asLink(field) ?? fallback;
}

function isProtocolHref(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

const descriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm leading-relaxed text-slate-600 md:text-base">{children}</p>
  ),
};

const imagePlaceholderComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="px-6 text-center text-sm text-slate-500">{children}</p>
  ),
};

const SubpageHeroSection: FC<SubpageHeroSectionProps> = ({ slice }) => {
  const {
    eyebrow_text,
    hero_title,
    hero_description,
    hero_image,
    hero_image_placeholder,
    primary_cta,
    secondary_cta,
  } = slice.primary;

  const title =
    hero_title?.trim() && hero_title.trim().length > 0 ? hero_title.trim() : defaultTitle;

  const eyebrow = eyebrow_text?.trim() ?? '';
  const hasDescription = isFilled.richText(hero_description);
  const hasImage = isFilled.image(hero_image);
  const imageUrl = hasImage ? (hero_image.url?.split('?')[0] ?? hero_image.url ?? '') : '';
  const imageAlt = hasImage ? (hero_image.alt ?? '') : '';
  const imageWidth = hasImage ? (hero_image.dimensions?.width ?? 1200) : 1200;
  const imageHeight = hasImage ? (hero_image.dimensions?.height ?? 900) : 900;

  const primaryHref = hrefFromLinkField(primary_cta, PRIMARY_DEFAULT_HREF);
  const primaryLabel = labelFromLinkField(primary_cta, PRIMARY_DEFAULT_LABEL);
  const secondaryHref = hrefFromLinkField(secondary_cta, SECONDARY_DEFAULT_HREF);
  const secondaryLabel = labelFromLinkField(secondary_cta, SECONDARY_DEFAULT_LABEL);

  const headingId = `subpage-hero-heading-${slice.id ?? 'subpage-hero'}`;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-14 md:py-16 lg:py-20')}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="order-2 flex min-w-0 flex-col lg:order-1">
            {eyebrow ? (
              <p className="w-fit bg-violet-100 rounded-full px-3 py-1.5 text-xs font-semibold uppercase text-violet-700 md:text-sm">
                {eyebrow}
              </p>
            ) : null}

            <h1
              id={headingId}
              className={cn(
                'text-2xl font-bold text-gray-800 md:text-4xl lg:leading-tight',
                eyebrow ? 'mt-2' : ''
              )}
            >
              {title}
            </h1>

            {hasDescription ? (
              <div className="mt-4 max-w-xl [&_p+p]:mt-3">
                <PrismicRichText field={hero_description} components={descriptionComponents} />
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-10">
              {isProtocolHref(secondaryHref) ? (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex h-auto items-center justify-center rounded-[8px] border border-violet-700 bg-transparent px-5 py-3 text-base font-medium text-violet-700 shadow-none transition-colors',
                    'hover:border-violet-800 hover:text-violet-800',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2',
                    'md:px-5 md:py-3 md:text-[18px]'
                  )}
                >
                  {secondaryLabel}
                </a>
              ) : (
                <Link
                  href={secondaryHref}
                  className={cn(
                    'inline-flex h-auto items-center justify-center rounded-[8px] border border-violet-700 bg-transparent px-5 py-3 text-base font-medium text-violet-700 shadow-none transition-colors',
                    'hover:border-violet-800 hover:text-violet-800',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2',
                    'md:px-5 md:py-3 md:text-[18px]'
                  )}
                >
                  {secondaryLabel}
                </Link>
              )}
              <Button
                asChild
                variant="default"
                className={cn(
                  'h-auto rounded-[8px] border border-violet-700 bg-violet-700 px-5 py-3 text-base font-medium text-white shadow-none',
                  'hover:bg-violet-800 hover:text-white hover:border-violet-800',
                  'md:px-5 md:py-3 md:text-[18px]'
                )}
              >
                {isProtocolHref(primaryHref) ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    {primaryLabel}
                  </a>
                ) : (
                  <Link href={primaryHref} className="inline-flex items-center justify-center">
                    {primaryLabel}
                  </Link>
                )}
              </Button>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            {hasImage ? (
              <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 top-1/2 z-0 h-[115%] w-[125%] -translate-y-1/2 rounded-[9999px] bg-[radial-gradient(ellipse_at_center,rgba(109,160,23,0.17)_0%,rgba(109,160,23,0.07)_42%,rgba(109,160,23,0)_75%)]"
                />
                <div className="relative z-10">
                  <Image
                    src={imageUrl}
                    alt={imageAlt || 'Hero image'}
                    width={imageWidth}
                    height={imageHeight}
                    quality={100}
                    unoptimized
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 lg:min-h-[280px]">
                {isFilled.richText(hero_image_placeholder) ? (
                  <PrismicRichText
                    field={hero_image_placeholder}
                    components={imagePlaceholderComponents}
                  />
                ) : (
                  <p className="px-6 text-center text-sm text-slate-500">
                    Add a hero image in Prismic.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubpageHeroSection;
