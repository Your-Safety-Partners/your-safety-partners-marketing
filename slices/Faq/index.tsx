import { FC, type ReactNode } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SliceEntrance } from '@/components/slices/slice-entrance';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const defaultSectionTitle = 'Frequently asked questions';

const questionTextClassName =
  'block text-left text-base font-semibold leading-snug text-gray-800 group-data-[state=open]:text-violet-700';

/** Rich text inside an accordion trigger must stay phrasing-only (valid inside `<button>`). */
const questionComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <span className={questionTextClassName}>{children}</span>
  ),
  heading2: ({ children }: { children: ReactNode }) => (
    <span className={questionTextClassName}>{children}</span>
  ),
  heading3: ({ children }: { children: ReactNode }) => (
    <span className={questionTextClassName}>{children}</span>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-inherit">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic text-inherit">{children}</em>
  ),
};

const sectionSubtitleComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-600 md:text-lg">{children}</p>
  ),
};

const answerComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-gray-600">{children}</p>
  ),
  list: ({ children }: { children: ReactNode }) => (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-gray-600">{children}</ul>
  ),
  oList: ({ children }: { children: ReactNode }) => (
    <ol className="mt-2 list-decimal space-y-1 pl-5 text-base text-gray-600">{children}</ol>
  ),
  listItem: ({ children }: { children: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-gray-800">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => <em className="italic">{children}</em>,
};

const Faq: FC<FaqProps> = ({ slice }) => {
  const { section_title, section_subtitle, faqs } = slice.primary;

  const heading =
    section_title?.trim() && section_title.trim().length > 0
      ? section_title.trim()
      : defaultSectionTitle;

  const faqRows = (faqs ?? []).filter(
    (row) => isFilled.richText(row.question_item) && isFilled.richText(row.answer_item)
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'overflow-x-hidden bg-gray-50 py-14 md:py-20 lg:py-24')}
      aria-labelledby="faq-section-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <SliceEntrance from="left" delayMs={0}>
            <h2
              id="faq-section-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-gray-800 md:text-4xl"
            >
              {heading}
            </h2>
          </SliceEntrance>
          {isFilled.richText(section_subtitle) ? (
            <SliceEntrance from="left" delayMs={60}>
              <div className="mt-4 [&_p+p]:mt-4">
                <PrismicRichText
                  field={section_subtitle}
                  components={sectionSubtitleComponents}
                />
              </div>
            </SliceEntrance>
          ) : null}
        </div>

        <SliceEntrance from="left" delayMs={120}>
          <div className="mx-auto mt-12 max-w-4xl md:mt-14">
            {faqRows.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500">
                Add FAQ entries (question and answer) in the FAQ slice in Prismic.
              </p>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqRows.map((row, index) => (
                  <AccordionItem
                    key={`faq-${index}`}
                    value={`faq-item-${index}`}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <AccordionTrigger
                      className={cn(
                        'group py-4 text-left hover:bg-violet-50/40 hover:no-underline md:py-5'
                      )}
                    >
                      <span className="pr-4">
                        <PrismicRichText
                          field={row.question_item}
                          components={questionComponents}
                        />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 [&_p+p]:mt-3">
                      <PrismicRichText field={row.answer_item} components={answerComponents} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </SliceEntrance>
      </div>
    </section>
  );
};

export default Faq;
