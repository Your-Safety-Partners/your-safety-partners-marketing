import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { CheckCircle2 } from "lucide-react";
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
    const hasSlices = page.data.slices.length > 0;
    const bookDemoUrl = `/book-a-demo?source=industry&industry=${encodeURIComponent(slug)}`;

    return (
      <div className="flex flex-col min-h-screen">
        {hasSlices ? (
          <SliceZone slices={page.data.slices} components={components} />
        ) : (
          <section className="bg-muted/40 py-20 md:py-28">
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

        {/* Content & Features Section - only show if there's content */}
        {(contentSections.length > 0 || keyFeatures.length > 0) && (
          <section className="py-20">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content Blocks */}
              {contentSections.length > 0 && (
                <div className="lg:col-span-2 space-y-12">
                  {contentSections.map((block, index) => (
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
                <div className={contentSections.length > 0 ? "lg:col-span-1" : "lg:col-span-3"}>
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
