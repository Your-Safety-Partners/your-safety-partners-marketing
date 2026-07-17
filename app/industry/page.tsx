import Link from "next/link";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { isResearchedIndustryUID, sortByResearchedIndustryOrder } from "@/lib/industry-pages";

export const metadata = {
  title: "Industries We Serve | Your Safety Partners",
  description: "Safety compliance isn't one-size-fits-all. Explore our tailored solutions designed to meet the specific regulatory requirements and hazards of your industry.",
};

export const revalidate = 3600;

export default async function IndustryIndex() {
  const client = createClient();
  const industries = await client.getAllByType('industry', {
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' }
    ]
  });
  const researchedIndustries = sortByResearchedIndustryOrder(
    industries.filter((industry) => isResearchedIndustryUID(industry.uid)),
  );
  const visibleIndustries = researchedIndustries.length > 0 ? researchedIndustries : industries;

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Industries We Serve</h1>
        <p className="text-lg text-muted-foreground">
          Safety compliance isn&apos;t one-size-fits-all. Explore our tailored solutions designed to meet the specific regulatory requirements and hazards of your industry.
        </p>
      </div>

      {visibleIndustries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No industries found. Create your first industry page in Prismic!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleIndustries.map((industry) => {
            const industryName = industry.data.industry_name || 'Industry';
            const subtitle = industry.data.subtitle || '';

            return (
              <Link key={industry.id} href={`/industry/${industry.uid}`} className="block group">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {industryName}
                    </CardTitle>
                    {subtitle && (
                      <CardDescription className="line-clamp-2">
                        {subtitle}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
