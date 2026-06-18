import { Check } from 'lucide-react';

import { BookADemoForm } from '@/components/forms/book-a-demo-form';
import { inter } from '@/lib/fonts/inter';
import { cn } from '@/lib/utils';

const EXPECTATIONS = [
  'Live walk-through of the compliance dashboard',
  'Safety modules scoped to your industry',
  'Policy, hazard, and incident workflows',
  'Training and competency tracking overview',
  'Pricing and rollout timeline for your team size',
] as const;

const LOGISTICS = [
  { label: 'Duration', value: '30 minutes' },
  { label: 'Format', value: 'Screen share + Q&A' },
  { label: 'Cost', value: 'Free — no commitment' },
  { label: 'Follow-up', value: 'Proposal within 24 hours if relevant' },
] as const;

const cardClass =
  'rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] md:p-7';

export function BookADemoContent() {
  return (
    <section className={cn(inter.className, 'bg-[#f9fafb] py-14 md:py-20 lg:py-24')}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-md bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-800">
            Book a demo
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            See Your Safety Portal in action
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Schedule a 30-minute live walkthrough with a product expert. No slides, no fluff — just
            your questions and your workflows.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 xl:gap-14">
          <div className="flex flex-col gap-6">
            <div className={cardClass}>
              <h2 className="text-lg font-bold text-gray-900 md:text-xl">
                What to expect on your call
              </h2>
              <ul className="mt-5 space-y-4">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-50"
                      aria-hidden
                    >
                      <Check className="size-3.5 text-emerald-600" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-gray-600 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={cardClass}>
              <dl className="space-y-4">
                {LOGISTICS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-sm text-gray-500">{row.label}</dt>
                    <dd className="text-right text-sm font-semibold text-gray-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={cn(cardClass, 'flex items-center gap-4')}>
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-base font-bold text-violet-700"
                aria-hidden
              >
                JT
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900">John Tregambe</p>
                <p className="text-sm text-gray-500">Founder &amp; Principal Safety Consultant</p>
                <p className="mt-1 text-xs font-medium text-violet-700">
                  17+ years in WHS · Certified Safety Consultant
                </p>
              </div>
            </div>
          </div>

          <BookADemoForm />
        </div>
      </div>
    </section>
  );
}
