import { notFound } from "next/navigation";
import { getIndustries, getIndustryBySlug } from "@/lib/outrank";
import { CheckCircle2 } from "lucide-react";
import CustomButton from "@/components/custom-ui/custom-button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = await getIndustryBySlug(slug);
  
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
  const industries = await getIndustries();
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = await getIndustryBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/50 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {page.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {page.subtitle}
            </p>
            <CustomButton title="Book a Demo" url="/contact" size="lg" />
          </div>
        </div>
      </section>

      {/* Content & Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {page.contentBlocks.map((block, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold tracking-tight mb-4">{block.heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {block.paragraph}
                </p>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Key Capabilities</h3>
              <ul className="space-y-4">
                {page.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
