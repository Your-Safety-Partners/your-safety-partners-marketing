import { notFound } from "next/navigation";
import { getComparisons, getComparisonBySlug } from "@/lib/outrank";
import { CheckCircle2, XCircle } from "lucide-react";
import CustomButton from "@/components/custom-ui/custom-button";

type Props = {
  params: Promise<{ competitor: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { competitor } = await params;
  const page = await getComparisonBySlug(competitor);
  
  if (!page) return {};
  
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
    }
  };
}

export async function generateStaticParams() {
  const comparisons = await getComparisons();
  return comparisons.map((comp) => ({
    competitor: comp.slug,
  }));
}

export default async function ComparisonPage({ params }: Props) {
  const { competitor } = await params;
  const page = await getComparisonBySlug(competitor);

  if (!page) {
    notFound();
  }

  const competitorName = competitor.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            {page.h1}
          </h1>
          <p className="text-xl text-slate-300 mb-10">
            {page.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CustomButton title="Start Free Trial" url="/contact" size="lg" />
            <CustomButton title="Book a Demo" url="/contact" variant="outline" className="text-black" size="lg" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-16">
            {page.contentBlocks.map((block, index) => (
              <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {block.paragraph}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table Equivalent */}
          <div className="mt-20 border border-border rounded-xl overflow-hidden">
            <div className="bg-muted px-6 py-4 border-b border-border">
              <h3 className="font-bold text-lg">Why Choose Your Safety Partners</h3>
            </div>
            <div className="divide-y divide-border">
              {page.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-4">
                  <span className="font-medium">{feature}</span>
                  <div className="flex items-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground mb-1 block md:hidden">Us</span>
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex flex-col items-center opacity-50">
                      <span className="text-xs text-muted-foreground mb-1 block md:hidden">{competitorName}</span>
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
