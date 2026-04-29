 'use client';

import { FC, useMemo, useState } from 'react';
import Link from 'next/link';
import { Content, isFilled, type RichTextField } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { SliceEntrance } from '@/components/slices/slice-entrance';
import { Button } from '@/components/ui/button';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

/**
 * Props for `ComplianceAudit`.
 */
export type ComplianceAuditProps =
  SliceComponentProps<Content.ComplianceAuditSlice>;

type AnswerValue = 'yes' | 'no' | null;

type AnswerLevel = 1 | 2 | 3 | 4;

type AnswerTip = {
  level: number;
  tip_title?: string;
  tip_description?: RichTextField;
};

const DESCRIPTION_TITLE_COLOR: Record<AnswerLevel, string> = {
  1: 'text-green-600',
  2: 'text-amber-500',
  3: 'text-orange-600',
  4: 'text-red-600',
};

function getAnswerLevel(yesCount: number): AnswerLevel {
  if (yesCount <= 1) return 4;
  if (yesCount <= 3) return 3;
  if (yesCount <= 5) return 2;
  return 1;
}

const ComplianceAudit: FC<ComplianceAuditProps> = ({ slice }) => {
  const { section_title, section_subtitle, questions } = slice.primary;
  const primary = slice.primary as Record<string, unknown>;
  const eyebrowText =
    typeof primary.eyebrow_text === 'string' ? primary.eyebrow_text : '';
  const answersTips = Array.isArray(primary.answers_tips)
    ? (primary.answers_tips as AnswerTip[])
    : [];

  const safeTotalQuestions = questions.length > 0 ? questions.length : 6;
  const initialYesCount = 0;

  const [answers, setAnswers] = useState<AnswerValue[]>(
    Array.from({ length: safeTotalQuestions }, (_, index) =>
      index < initialYesCount ? 'yes' : null
    )
  );

  const yesCount = useMemo(
    () => answers.reduce((count, value) => (value === 'yes' ? count + 1 : count), 0),
    [answers]
  );
  const hasAnyAnswered = useMemo(
    () => answers.some((value) => value !== null),
    [answers]
  );
  const hasAllAnswered = useMemo(
    () => answers.every((value) => value !== null),
    [answers]
  );

  const answerLevel = getAnswerLevel(yesCount);
  const activeTip = answersTips.find((tip) => tip.level === answerLevel);

  const setAnswer = (questionIndex: number, value: Exclude<AnswerValue, null>) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[questionIndex] = previous[questionIndex] === value ? null : value;
      return next;
    });
  };

  const resetAnswers = () => {
    setAnswers(Array.from({ length: safeTotalQuestions }, () => null));
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(inter.className, 'bg-gray-50 py-16 md:py-20')}
    >
      <SliceEntrance>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
              <div>
                <p className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700">
                  {eyebrowText.trim()}
                </p>

                <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                  {section_title?.trim()}
                </h2>

                <div className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                  <PrismicRichText field={section_subtitle} />
                </div>

                <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-5xl font-bold leading-none text-slate-900">
                    {yesCount}
                    <span className="ml-1 text-3xl text-slate-400">
                      /{safeTotalQuestions}
                    </span>
                  </p>
                  <p className="mt-2 text-lg text-slate-500">answered &quot;Yes&quot;</p>
                  <div className="mt-3 text-base leading-relaxed text-slate-600 [&_p+p]:mt-2">
                    {hasAnyAnswered && activeTip?.tip_title ? (
                      <p
                        className={cn(
                          'font-semibold',
                          DESCRIPTION_TITLE_COLOR[answerLevel]
                        )}
                      >
                        {activeTip.tip_title}
                      </p>
                    ) : null}
                    {hasAnyAnswered && isFilled.richText(activeTip?.tip_description) ? (
                      <PrismicRichText field={activeTip.tip_description} />
                    ) : (
                      <p>
                        Answer honestly — then we&apos;ll tell you where the Inspections
                        module fits.
                      </p>
                    )}
                  </div>
                  {hasAllAnswered ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={resetAnswers}
                        className="cursor-pointer border border-violet-700 bg-transparent text-violet-700 hover:bg-violet-100 hover:text-violet-700"
                      >
                        Reset
                      </Button>
                      <Button asChild className='bg-violet-700 text-white hover:bg-violet-700 hover:text-white hover:bg-violet-600'>
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>

              <ul className="space-y-3">
                {Array.from({ length: safeTotalQuestions }, (_, index) => {
                  const question = questions[index];
                  const fallback =
                    'Can you prove to safety authorities that every worker has been trained in the safety requirements of their job role?';

                  return (
                    <li
                      key={`compliance-question-${index}`}
                      className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4"
                    >
                      <div className="text-base leading-relaxed text-slate-800">
                        {isFilled.richText(question?.question_item) ? (
                          <PrismicRichText field={question.question_item} />
                        ) : (
                          <p>{fallback}</p>
                        )}
                      </div>

                      <div className="inline-flex shrink-0 rounded-full border border-gray-200 bg-white p-1">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setAnswer(index, 'yes')}
                          className={cn(
                            'h-auto rounded-full px-4 py-1.5 text-sm font-semibold !bg-transparent',
                            answers[index] === 'yes'
                              ? '!bg-green-300 !text-green-700 hover:!bg-green-300 hover:!text-green-700'
                              : 'text-gray-600 hover:!bg-green-100 hover:!text-green-500'
                          )}
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setAnswer(index, 'no')}
                          className={cn(
                            'h-auto rounded-full px-4 py-1.5 text-sm font-semibold !bg-transparent',
                            answers[index] === 'no'
                              ? '!bg-red-300 !text-red-700 hover:!bg-red-300 hover:!text-red-700'
                              : 'text-gray-600 hover:!bg-red-100 hover:!text-red-500'
                          )}
                        >
                          No
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </SliceEntrance>
    </section>
  );
};

export default ComplianceAudit;
