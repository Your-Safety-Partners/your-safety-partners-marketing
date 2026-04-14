import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import {
  Building2,
  Factory,
  HardHat,
  HeartPulse,
  Package,
  ShoppingCart,
  Tractor,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

import { SliceEntrance, SliceEntranceGroup } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type IndustriesProps = SliceComponentProps<Content.HowWeCanWelpSlice>;

const defaultSectionTitle = 'Industries We Support';

const DEFAULT_CARDS: { title: string; description: string }[] = [
  { title: 'Construction', description: 'On-site safety & compliance' },
  { title: 'Manufacturing', description: 'Production floor safety' },
  { title: 'Warehousing & Logistics', description: 'Storage & distribution safety' },
  { title: 'Food & Hospitality', description: 'Food service safety' },
  { title: 'Agriculture', description: 'Farm & field safety' },
  { title: 'Healthcare & Aged Care', description: 'Patient & staff safety' },
  { title: 'Transport', description: 'Fleet & driver safety' },
  { title: 'Retail', description: 'In-store safety' },
];

const STAGGER_MS = 45;

const sectionIntroComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-pretty text-base font-normal leading-relaxed text-gray-500 md:text-lg">
      {children}
    </p>
  ),
};

const industryCardClassName =
  'group flex h-full flex-col rounded-2xl border border-transparent bg-white p-6 shadow-sm transition-colors duration-200 hover:border-violet-700 hover:bg-violet-700/10 md:p-7';

const industryTitleClassName =
  'text-base font-semibold leading-snug tracking-tight text-gray-700 transition-colors duration-200 group-hover:text-violet-700';

const cardDescriptionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm font-normal leading-relaxed text-gray-500 transition-colors duration-200 group-hover:text-violet-500">
      {children}
    </p>
  ),
};

function iconForIndustryTitle(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes('construction')) return HardHat;
  if (t.includes('manufacturing')) return Factory;
  if (t.includes('warehous') || t.includes('logistics')) return Package;
  if (t.includes('food') || t.includes('hospitality')) return UtensilsCrossed;
  if (t.includes('agriculture')) return Tractor;
  if (t.includes('healthcare') || t.includes('aged care')) return HeartPulse;
  if (t.includes('transport')) return Truck;
  if (t.includes('retail')) return ShoppingCart;
  return Building2;
}

const Industries: FC<IndustriesProps> = ({ slice }) => {
  const { section_title, section_description, industries } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const cmsRows = (industries ?? []).filter((row) => {
    const hasTitle = Boolean(row.industry_item?.trim());
    const hasDescription = isFilled.richText(row.description);
    const hasIcon = isFilled.image(row.industry_icon);
    return hasTitle || hasDescription || hasIcon;
  });

  const useDefaults = cmsRows.length === 0;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'overflow-x-hidden bg-gray-50 py-16 md:py-20 lg:py-24')}
      aria-labelledby="industries-section-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SliceEntrance from="left" delayMs={0}>
            <h2
              id="industries-section-heading"
              className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl"
            >
              {heading}
            </h2>
          </SliceEntrance>

          {isFilled.richText(section_description) ? (
            <SliceEntrance from="left" delayMs={STAGGER_MS}>
              <div className="mt-4 [&_p+p]:mt-4">
                <PrismicRichText
                  field={section_description}
                  components={sectionIntroComponents}
                />
              </div>
            </SliceEntrance>
          ) : null}
        </div>

        <SliceEntranceGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {useDefaults
            ? DEFAULT_CARDS.map((card, index) => {
                const Icon = iconForIndustryTitle(card.title);
                return (
                  <SliceEntrance key={card.title} from="left" delayMs={index * STAGGER_MS}>
                    <article className={industryCardClassName}>
                      <div className="mb-4 text-violet-600" aria-hidden>
                        <Icon className="size-9" strokeWidth={1.5} />
                      </div>
                      <h3 className={industryTitleClassName}>{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500 transition-colors duration-200 group-hover:text-violet-500">
                        {card.description}
                      </p>
                    </article>
                  </SliceEntrance>
                );
              })
            : cmsRows.map((row, index) => {
                const title = row.industry_item?.trim() ?? '';
                const Icon = iconForIndustryTitle(title);
                const key = `${title}-${index}`;

                return (
                  <SliceEntrance key={key} from="left" delayMs={index * STAGGER_MS}>
                    <article className={industryCardClassName}>
                      <div className="mb-4 shrink-0" aria-hidden>
                        {isFilled.image(row.industry_icon) ? (
                          // eslint-disable-next-line @next/next/no-img-element -- Prismic industry icon
                          <img
                            src={row.industry_icon.url ?? ''}
                            alt={row.industry_icon.alt ?? ''}
                            width={36}
                            height={36}
                            className="size-9 object-contain"
                            draggable={false}
                          />
                        ) : (
                          <span className="inline-flex text-violet-600">
                            <Icon className="size-9" strokeWidth={1.5} />
                          </span>
                        )}
                      </div>
                      {title ? <h3 className={industryTitleClassName}>{title}</h3> : null}
                      {isFilled.richText(row.description) ? (
                        <div className="mt-1 min-w-0 [&_p+p]:mt-2">
                          <PrismicRichText
                            field={row.description}
                            components={cardDescriptionComponents}
                          />
                        </div>
                      ) : null}
                    </article>
                  </SliceEntrance>
                );
              })}
        </SliceEntranceGroup>
      </div>
    </section>
  );
};

export default Industries;
