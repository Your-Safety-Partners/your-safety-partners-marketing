import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { CheckCircle2, Quote } from "lucide-react";
import CustomButton from "@/components/custom-ui/custom-button";
import { isFilled } from "@prismicio/client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const client = createClient();

  try {
    const page = await client.getByUID('industry', slug);

    const title = isFilled.keyText(page.data.meta_title)
      ? page.data.meta_title
      : `${page.data.industry_name} Safety Software | Your Safety Partners`;

    const description = isFilled.keyText(page.data.meta_description)
      ? page.data.meta_description
      : page.data.subtitle || '';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: isFilled.image(page.data.meta_image) ? [page.data.meta_image.url] : [],
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const client = createClient();
  const industries = await client.getAllByType('industry');

  return industries.map((industry) => ({
    slug: industry.uid,
  }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const client = createClient();

  try {
    const page = await client.getByUID('industry', slug);

    const industryName = page.data.industry_name || 'Industry';
    const subtitle = page.data.subtitle || '';
    const contentSections = page.data.content_sections || [];
    const keyFeatures = page.data.key_features || [];
    const proofSection = contentSections.find((block) =>
      block.heading?.toLowerCase().startsWith("relevant client proof:")
    );
    const caseStudySection = contentSections.find((block) =>
      block.heading?.toLowerCase().startsWith("mini case study angle:")
    );
    const standardContentSections = contentSections.filter(
      (block) => block !== proofSection && block !== caseStudySection
    );
    const proofClientName = proofSection?.heading?.replace(/^Relevant client proof:\s*/i, "");
    const proofCaseStudyHeading = caseStudySection?.heading?.replace(/^Mini case study angle:\s*/i, "");
    const hasClientProof = Boolean(proofSection?.paragraph && caseStudySection?.paragraph);
    const hasSlices = page.data.slices.length > 0;
    const bookDemoUrl = `/book-a-demo?source=industry&industry=${encodeURIComponent(slug)}`;

    return (
      <div className="flex flex-col min-h-screen">
        {hasSlices ? (
          <SliceZone slices={page.data.slices} components={components} />
        ) : (
          <section className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                  {industryName}
                </h1>
                {subtitle && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {subtitle}
                  </p>
                )}
                <CustomButton title="Book a Demo" url={bookDemoUrl} size="lg" />
              </div>
            </div>
          </section>
        )}

        {hasClientProof && (
          <section className="bg-slate-50 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                    <Quote className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {proofClientName}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-slate-700">
                    {proofSection?.paragraph}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Mini case study
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    {proofCaseStudyHeading}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-slate-700">
                    {caseStudySection?.paragraph}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content & Features Section - only show if there's content */}
        {(standardContentSections.length > 0 || keyFeatures.length > 0) && (
          <section className="bg-white py-20">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content Blocks */}
              {standardContentSections.length > 0 && (
                <div className="lg:col-span-2 space-y-12">
                  {standardContentSections.map((block, index) => (
                    <div key={index}>
                      {block.heading && (
                        <h2 className="text-2xl font-bold tracking-tight mb-4">
                          {block.heading}
                        </h2>
                      )}
                      {block.paragraph && (
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {block.paragraph}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key Features Sidebar */}
              {keyFeatures.length > 0 && (
                <div className={standardContentSections.length > 0 ? "lg:col-span-1" : "lg:col-span-3"}>
                  <div className="bg-card border border-border rounded-xl p-8 sticky top-24">
                    <h3 className="text-xl font-bold mb-6">Key Capabilities</h3>
                    <ul className="space-y-4">
                      {keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                          <div>
                            {feature.feature_title && (
                              <span className="font-medium">{feature.feature_title}</span>
                            )}
                            {feature.feature_description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {feature.feature_description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <CustomButton title="Book a Demo" url={bookDemoUrl} size="lg" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
