import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Quote } from "lucide-react";
import CustomButton from "@/components/custom-ui/custom-button";

type TextItem = {
  title?: string | null;
  description?: string | null;
};

type WorkflowStep = {
  step_title?: string | null;
  step_description?: string | null;
};

type ContentSection = {
  heading?: string | null;
  paragraph?: string | null;
};

type ComparisonRow = {
  feature?: string | null;
  ysp_position?: string | null;
  alternative_position?: string | null;
};

type Faq = {
  question?: string | null;
  answer?: string | null;
};

type InternalLink = {
  label?: string | null;
  url?: string | null;
};

export type DemandPageData = {
  page_type?: string | null;
  primary_keyword?: string | null;
  search_intent?: string | null;
  title?: string | null;
  subtitle?: string | null;
  trust_statement?: string | null;
  primary_cta_label?: string | null;
  primary_cta_url?: string | null;
  secondary_cta_label?: string | null;
  secondary_cta_url?: string | null;
  pain_points?: TextItem[];
  capabilities?: TextItem[];
  workflow_steps?: WorkflowStep[];
  content_sections?: ContentSection[];
  comparison_rows?: ComparisonRow[];
  proof_quote?: string | null;
  proof_client_name?: string | null;
  proof_case_study?: string | null;
  faqs?: Faq[];
  internal_links?: InternalLink[];
  meta_title?: string | null;
  meta_description?: string | null;
  meta_image?: { url?: string | null } | null;
};

type Props = {
  data: DemandPageData;
  slug: string;
};

function hasText(value: string | null | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

function getDemoUrl(data: DemandPageData, slug: string) {
  if (hasText(data.primary_cta_url)) return data.primary_cta_url as string;
  return `/book-a-demo?source=demand&page=${encodeURIComponent(slug)}`;
}

export default function DemandPageContent({ data, slug }: Props) {
  const title = data.title || data.primary_keyword || slug.replace(/-/g, " ");
  const primaryCtaLabel = data.primary_cta_label || "Book a Demo";
  const primaryCtaUrl = getDemoUrl(data, slug);
  const painPoints = data.pain_points?.filter((item) => hasText(item.title) || hasText(item.description)) ?? [];
  const capabilities = data.capabilities?.filter((item) => hasText(item.title) || hasText(item.description)) ?? [];
  const workflowSteps = data.workflow_steps?.filter((item) => hasText(item.step_title) || hasText(item.step_description)) ?? [];
  const contentSections = data.content_sections?.filter((item) => hasText(item.heading) || hasText(item.paragraph)) ?? [];
  const comparisonRows = data.comparison_rows?.filter((item) => hasText(item.feature)) ?? [];
  const faqs = data.faqs?.filter((item) => hasText(item.question) || hasText(item.answer)) ?? [];
  const internalLinks = data.internal_links?.filter((item) => hasText(item.label) && hasText(item.url)) ?? [];
  const hasProof = hasText(data.proof_quote) || hasText(data.proof_case_study);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {data.primary_keyword && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-600">
                {data.primary_keyword}
              </p>
            )}
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
              {title}
            </h1>
            {data.subtitle && (
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-600">
                {data.subtitle}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CustomButton title={primaryCtaLabel} url={primaryCtaUrl} size="lg" />
              {hasText(data.secondary_cta_label) && hasText(data.secondary_cta_url) && (
                <CustomButton
                  title={data.secondary_cta_label as string}
                  url={data.secondary_cta_url as string}
                  variant="outline"
                  size="lg"
                />
              )}
            </div>
            {data.trust_statement && (
              <p className="mt-6 text-sm font-medium text-slate-500">
                {data.trust_statement}
              </p>
            )}
          </div>
        </div>
      </section>

      {painPoints.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight">What this solves</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                These pages are built for buyers trying to fix a real WHS record, inspection, training, hazard or compliance problem.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {painPoints.map((item, index) => (
                <div key={index} className="rounded-lg border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="mt-3 leading-relaxed text-slate-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {capabilities.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">What Your Safety Portal includes</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  A practical WHS portal for Australian SMBs, set up with support from safety consultants.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {capabilities.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-600" aria-hidden />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {workflowSteps.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight">How the workflow fits together</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Connect the records staff create with the visibility managers need.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {workflowSteps.map((item, index) => (
                <div key={index} className="rounded-lg border border-slate-200 bg-white p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-600">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{item.step_title}</h3>
                  {item.step_description && (
                    <p className="mt-3 leading-relaxed text-slate-600">{item.step_description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {contentSections.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-12">
              {contentSections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{section.heading}</h2>
                  {section.paragraph && (
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">{section.paragraph}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {comparisonRows.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight">How it compares</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                A fair comparison for Australian SMBs deciding what kind of safety platform they need.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              {comparisonRows.map((row, index) => (
                <div key={index} className="grid gap-4 border-b border-slate-200 p-5 last:border-b-0 md:grid-cols-3">
                  <div className="font-semibold">{row.feature}</div>
                  <div className="text-slate-700">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-orange-600">Your Safety Portal</span>
                    {row.ysp_position}
                  </div>
                  <div className="text-slate-600">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Other option</span>
                    {row.alternative_position}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasProof && (
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 md:p-8">
                <Quote className="mb-5 h-8 w-8 text-orange-600" aria-hidden />
                {data.proof_client_name && (
                  <h2 className="text-2xl font-bold tracking-tight">{data.proof_client_name}</h2>
                )}
                {data.proof_quote && (
                  <p className="mt-5 text-lg leading-relaxed text-slate-700">{data.proof_quote}</p>
                )}
              </div>
              {data.proof_case_study && (
                <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Mini case study
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-slate-700">{data.proof_case_study}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {internalLinks.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight">Related pages</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {internalLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.url as string}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-orange-600 hover:text-orange-600"
                >
                  {item.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-3">
                <ClipboardCheck className="h-7 w-7 text-orange-600" aria-hidden />
                <h2 className="text-3xl font-bold tracking-tight">FAQs</h2>
              </div>
              <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
                {faqs.map((faq, index) => (
                  <details key={index} className="group p-5">
                    <summary className="cursor-pointer text-lg font-semibold marker:text-orange-600">
                      {faq.question}
                    </summary>
                    {faq.answer && (
                      <p className="mt-3 leading-relaxed text-slate-600">{faq.answer}</p>
                    )}
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-900 py-16 text-white md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            See how Your Safety Portal can fit your WHS workflow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Book a demo with an Australian safety team that can show the portal around your records, roles and obligations.
          </p>
          <div className="mt-8">
            <CustomButton title={primaryCtaLabel} url={primaryCtaUrl} size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
