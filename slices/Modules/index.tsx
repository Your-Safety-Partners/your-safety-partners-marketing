import { FC, type ReactNode } from 'react';
import Link from 'next/link';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { Card } from '@/components/ui/card';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type PlatformAppsProps = SliceComponentProps<Content.PlatformAppsSlice>;

const defaultSectionTitle = 'Everything You Need in One Platform';
const defaultSectionSubtitle =
  'Comprehensive safety management modules designed to keep your workplace compliant, efficient, and protected.';

/** Title / “Learn more” color per module (from design). */
const MODULE_COLORS = {
  policies: '#6DA017',
  forms: '#07A372',
  inspections: '#337CF3',
  training: '#FFA600',
  hazards: '#CA0F3E',
  contractors: '#D55F0C',
} as const;

const LOGO_PX = 52;

function getModuleAccentColor(moduleName: string): string {
  const n = moduleName.toLowerCase().trim();
  if (n.includes('polic')) return MODULE_COLORS.policies;
  if (n.includes('form')) return MODULE_COLORS.forms;
  if (n.includes('inspection')) return MODULE_COLORS.inspections;
  if (n.includes('train')) return MODULE_COLORS.training;
  if (n.includes('hazard')) return MODULE_COLORS.hazards;
  if (n.includes('contractor')) return MODULE_COLORS.contractors;
  return '#64748b';
}

const richComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500">{children}</p>
  ),
};

const subtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500 md:text-lg">{children}</p>
  ),
};

const PlatformApps: FC<PlatformAppsProps> = ({ slice }) => {
  const { section_title, section_subtitle, modules } = slice.primary;
  const rows = (modules ?? []).filter((row) => isFilled.image(row.module_logo));

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20 lg:py-24')}
      aria-labelledby="modules-section-heading"
    >
      <SliceEntrance>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="modules-section-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
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
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                {defaultSectionSubtitle}
              </p>
            )}
          </div>
        </header>

        {rows.length === 0 ? (
          <p className="mt-12 text-center text-sm text-gray-500">
            Add modules with a module logo in the Prismic Modules slice.
          </p>
        ) : (
          <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((row, index) => {
              const name = row.module_name?.trim() ?? '';
              const accent = getModuleAccentColor(name);
              const hasBody = isFilled.richText(row.module_description);
              const logo = row.module_logo;

              return (
                <li key={`${logo.url}-${index}`}>
                  <Card
                    className={cn(
                      'flex h-full flex-col rounded-xl border border-gray-200/80 bg-white px-[24px] py-[32px] shadow-sm',
                      'transition-shadow duration-200 hover:shadow-md'
                    )}
                  >
                    <div className="mb-5 flex size-[52px] shrink-0 items-center justify-center rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element -- Prismic module artwork */}
                      <img
                        src={logo.url ?? ''}
                        alt={logo.alt ?? ''}
                        width={logo.dimensions?.width ?? LOGO_PX}
                        height={logo.dimensions?.height ?? LOGO_PX}
                        className="max-h-[52px] max-w-[52px] object-contain"
                        draggable={false}
                      />
                    </div>

                    {name ? (
                      <h3
                        className="text-xl font-bold leading-snug"
                        style={{ color: accent }}
                      >
                        {name}
                      </h3>
                    ) : null}

                    {hasBody ? (
                      <div className="mt-3 flex-1 [&_p+p]:mt-2">
                        <PrismicRichText
                          field={row.module_description}
                          components={richComponents}
                        />
                      </div>
                    ) : null}

                    <div className="mt-6 flex justify-end pt-1">
                      <Link
                        href="/features"
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-85"
                        style={{ color: accent }}
                      >
                        Learn more
                        <ArrowRight className="size-4 shrink-0" aria-hidden />
                      </Link>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
        </div>
      </SliceEntrance>
    </section>
  );
};

export default PlatformApps;
