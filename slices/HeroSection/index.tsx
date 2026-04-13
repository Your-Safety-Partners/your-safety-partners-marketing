import { FC } from 'react';
import Link from 'next/link';
import { Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { ChevronRight } from 'lucide-react';

import { SliceEntrance, SliceEntranceGroup } from '@/components/slices/slice-entrance';
import { Button } from '@/components/ui/button';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/** Used when Prismic has no hero image yet — add `public/images/hero.jpg` or change this path. */
const FALLBACK_HERO_SRC = '/images/hero.jpg';

const defaultSubtitle = 'Trusted Safety Consultants';
const defaultTitle = 'Safety & Compliance Solutions';
const defaultDescription =
  'For the past 15 years Your Safety Partners has been helping businesses comply with safety laws and reduce their risk of causing harm to people in the work place.';

const stats = [
  { value: '2,000+', label: 'Active Users' },
  { value: '100+', label: 'Active Companies' },
  { value: '24/7', label: 'Support' },
] as const;

/** Stagger (ms) for left-column blocks after the hero is in view. */
const LEFT_STAGGER_MS = 85;

const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  const { subtitle, hero_title, hero_description, hero_image } = slice.primary;

  const badgeText = subtitle?.trim() || defaultSubtitle;
  const titleText = hero_title?.trim() || defaultTitle;
  const descriptionText = hero_description?.trim() || defaultDescription;

  const imageUrl = isFilled.image(hero_image) ? hero_image.url : FALLBACK_HERO_SRC;
  const imageAlt = isFilled.image(hero_image) ? (hero_image.alt ?? '') : 'Hero image';

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'overflow-x-hidden bg-gray-50 py-14 md:py-20 lg:py-24')}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <SliceEntranceGroup className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex max-w-xl flex-col lg:max-w-none">
            <SliceEntrance from="left" delayMs={0 * LEFT_STAGGER_MS}>
              <p className="inline-block rounded-md bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-800">
                {badgeText}
              </p>
            </SliceEntrance>

            <SliceEntrance from="left" delayMs={1 * LEFT_STAGGER_MS}>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-gray-800 md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
                {titleText}
              </h1>
            </SliceEntrance>

            <SliceEntrance from="left" delayMs={2 * LEFT_STAGGER_MS}>
              <p className="mt-4 text-[20px] leading-relaxed text-gray-600">{descriptionText}</p>
            </SliceEntrance>

            <SliceEntrance from="left" delayMs={3 * LEFT_STAGGER_MS}>
              <div className="mt-12 flex flex-wrap gap-6">
                <Link
                  href="/contact"
                  className="inline-flex h-auto items-center justify-center rounded-[8px] border border-violet-700 bg-transparent px-[20px] py-[12px] text-[18px] font-medium text-violet-700 transition-colors hover:bg-violet-50/80 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                >
                  Book a Demo
                </Link>
                <Button
                  asChild
                  variant="default"
                  className="h-auto rounded-[8px] border-0 bg-violet-700 px-[20px] py-[12px] text-[18px] font-medium text-white shadow-none hover:bg-violet-700/90 has-[>svg]:px-[20px]"
                >
                  <Link href="/contact" className="inline-flex items-center gap-1.5">
                    Get in Touch
                    <ChevronRight className="size-[18px] shrink-0" aria-hidden />
                  </Link>
                </Button>
              </div>
            </SliceEntrance>

            <SliceEntrance from="left" delayMs={4 * LEFT_STAGGER_MS}>
              <div className="flex flex-row gap-6 pt-10 sm:gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </SliceEntrance>
          </div>

          <SliceEntrance from="right" delayMs={0}>
            <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
              <div className="relative z-10 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- Prismic CDN or local public path; avoids next/image config for arbitrary URLs */}
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  width={isFilled.image(hero_image) ? hero_image.dimensions?.width : 960}
                  height={isFilled.image(hero_image) ? hero_image.dimensions?.height : 720}
                  className={cn(
                    'aspect-[4/3] h-auto w-full object-cover',
                    !isFilled.image(hero_image) && 'min-h-[280px] bg-gray-100'
                  )}
                />
              </div>
            </div>
          </SliceEntrance>
        </SliceEntranceGroup>
      </div>
    </section>
  );
};

export default HeroSection;
