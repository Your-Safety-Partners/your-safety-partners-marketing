import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { CheckCircle2 } from 'lucide-react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { Card } from '@/components/ui/card';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type FinancialReliefProps = SliceComponentProps<Content.FinancialReliefSlice>;

const defaultSectionTitle = 'Calculate Your Total Financial Relief';
const defaultSectionSubtitle =
  'Your Safety Portal recovers more than it costs — protecting your bottom line and your people.';

const defaultTableSectionTitle = 'Real Cost Savings Analysis';
const defaultTableSectionSubtitle =
  'Compare traditional paper-based costs with outcomes when you use Your Safety Portal.';

const defaultZeroClaimTitle = 'Zero-Claim Scenario: How it Works';

const subtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-500 md:text-lg">{children}</p>
  ),
};

function isTotalsCategory(category: string | null | undefined): boolean {
  const c = category?.trim().toLowerCase() ?? '';
  return c === 'totals' || c === 'total';
}

function hasTableRowContent(
  row: Content.FinancialReliefSliceDefaultPrimaryFinancialTableItem
): boolean {
  return Boolean(
    row.category_of_loss?.trim() ||
      row.the_paper_way_costs?.trim() ||
      row.your_safety_portal_result?.trim()
  );
}

function hasZeroClaimItem(
  row: Content.FinancialReliefSliceDefaultPrimaryZeroClaimItemTitleItem
): boolean {
  return Boolean(
    row.zero_claim_item_title?.trim() || row.zero_claim_item_description?.trim()
  );
}

const FinancialRelief: FC<FinancialReliefProps> = ({ slice }) => {
  const {
    section_title,
    section_subtitle,
    cards,
    section_title_2,
    section_subtitle_2,
    financial_table,
    zero_claim_title,
    zero_claim_item_title: zeroClaimItems,
  } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const tableHeading =
    section_title_2?.trim() && section_title_2.trim().length > 0
      ? section_title_2.trim()
      : defaultTableSectionTitle;

  const tableSubtitle =
    section_subtitle_2?.trim() && section_subtitle_2.trim().length > 0
      ? section_subtitle_2.trim()
      : defaultTableSectionSubtitle;

  const tableRows = (financial_table ?? []).filter(hasTableRowContent);
  const bodyRows = tableRows.filter((row) => !isTotalsCategory(row.category_of_loss));
  const footerRow = tableRows.find((row) => isTotalsCategory(row.category_of_loss));

  const cardItems = (cards ?? []).filter(
    (row) =>
      row.card_title?.trim() ||
      row.card_subtitle?.trim() ||
      row.card_text?.trim() ||
      isFilled.image(row.card_icon)
  );

  const scenarioRows = (zeroClaimItems ?? []).filter(hasZeroClaimItem);
  const scenarioTitleRaw = zero_claim_title?.trim() ?? '';
  const scenarioTitle =
    scenarioTitleRaw ||
    (scenarioRows.length > 0 ? defaultZeroClaimTitle : '');
  const showZeroClaimBox = scenarioRows.length > 0;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20 lg:py-24')}
      aria-labelledby="financial-relief-heading"
    >
      <SliceEntrance>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <header className="mx-auto text-center">
          <h2
            id="financial-relief-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            {heading}
          </h2>
          <div className="mt-4">
            {isFilled.richText(section_subtitle) ? (
              <div className="[&_p+p]:mt-3">
                <PrismicRichText field={section_subtitle} components={subtitleComponents} />
              </div>
            ) : (
              <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                {defaultSectionSubtitle}
              </p>
            )}
          </div>
        </header>

        {cardItems.length === 0 ? (
          <p className="mt-12 text-center text-sm text-gray-500">
            Add metric cards in the Financial Relief slice (Cards group).
          </p>
        ) : (
          <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardItems.map((row, index) => {
              const icon = row.card_icon;

              return (
                <li key={`${row.card_title ?? 'card'}-${index}`}>
                  <Card className="h-full rounded-xl border-0 bg-white p-6 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                    {isFilled.image(icon) ? (
                      <div>
                        {/* eslint-disable-next-line @next/next/no-img-element -- Prismic card artwork */}
                        <img
                          src={icon.url ?? ''}
                          alt={icon.alt ?? ''}
                          width={52}
                          height={52}
                          className="size-13 object-contain"
                          draggable={false}
                        />
                      </div>
                    ) : null}
                    {row.card_title?.trim() ? (
                      <p
                        className={cn(
                          'text-[24px] font-bold leading-snug tracking-tight text-gray-800',
                          isFilled.image(icon) ? 'mt-4' : 'mt-0'
                        )}
                      >
                        {row.card_title.trim()}
                      </p>
                    ) : null}
                    {row.card_subtitle?.trim() ? (
                      <p className="mt-2 text-base font-semibold text-gray-700">
                        {row.card_subtitle.trim()}
                      </p>
                    ) : null}
                    {row.card_text?.trim() ? (
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {row.card_text.trim()}
                      </p>
                    ) : null}
                  </Card>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-16 md:mt-20">
          <header className="mx-auto text-center">
            <h3 className="text-[24px] font-medium leading-snug tracking-tight text-gray-900">
              {tableHeading}
            </h3>
            <p className="mt-3 text-base font-normal leading-relaxed text-gray-500">
              {tableSubtitle}
            </p>
          </header>

          {tableRows.length === 0 ? (
            <p className="mt-8 text-center text-sm text-gray-500">
              Add rows in the Financial Table group (include a row with category “Totals” for the
              highlighted footer).
            </p>
          ) : (
            <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-900">
                    <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                      Category of Loss
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                      The &quot;Paper&quot; Way (Costs)
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                      Your Safety Portal (Result)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, index) => (
                    <tr
                      key={`${row.category_of_loss ?? 'row'}-${index}`}
                      className="border-t border-gray-200 bg-white"
                    >
                      <td className="px-4 py-4 font-normal text-gray-900 md:px-6">
                        {row.category_of_loss?.trim() ?? '—'}
                      </td>
                      <td className="px-4 py-4 font-normal text-red-600 md:px-6">
                        {row.the_paper_way_costs?.trim() ?? '—'}
                      </td>
                      <td className="px-4 py-4 font-normal text-green-600 md:px-6">
                        {row.your_safety_portal_result?.trim() ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {footerRow ? (
                  <tfoot>
                    <tr className="border-t border-violet-200 bg-violet-100">
                      <td className="px-4 py-4 font-semibold text-gray-900 md:px-6">
                        {footerRow.category_of_loss?.trim() ?? 'Totals'}
                      </td>
                      <td className="px-4 py-4 font-normal text-red-600 md:px-6">
                        {footerRow.the_paper_way_costs?.trim() ?? '—'}
                      </td>
                      <td className="px-4 py-4 font-normal text-green-600 md:px-6">
                        {footerRow.your_safety_portal_result?.trim() ?? '—'}
                      </td>
                    </tr>
                  </tfoot>
                ) : null}
              </table>
            </div>
          )}
        </div>

        {showZeroClaimBox ? (
          <div className="mt-12 flex justify-center">
            <Card className="w-fit max-w-full rounded-xl border border-violet-700 bg-violet-50/90 p-[24px] shadow-none">
              {scenarioTitle ? (
                <h3 className="text-left text-[20px] font-medium leading-snug tracking-tight text-gray-900">
                  {scenarioTitle}
                </h3>
              ) : null}
              <ul
                className={cn(
                  'list-none space-y-4',
                  scenarioTitle ? 'mt-4' : 'mt-0'
                )}
              >
                {scenarioRows.map((item, index) => {
                  const label = item.zero_claim_item_title?.trim() ?? '';
                  const desc = item.zero_claim_item_description?.trim() ?? '';
                  const between =
                    label && desc ? (/:\s*$/.test(label) ? ' ' : ': ') : '';

                  return (
                    <li
                      key={`${item.zero_claim_item_title ?? 'zero-claim'}-${index}`}
                      className="flex gap-[12px] text-left"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-violet-700"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <p className="text-[14px] font-normal leading-relaxed">
                        {label ? (
                          <span className="font-semibold text-gray-900">
                            {label}
                            {between}
                          </span>
                        ) : null}
                        {desc ? (
                          <span className="font-normal text-gray-600">{desc}</span>
                        ) : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        ) : null}
        </div>
      </SliceEntrance>
    </section>
  );
};

export default FinancialRelief;
