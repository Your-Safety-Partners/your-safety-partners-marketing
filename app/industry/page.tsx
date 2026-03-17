import Link from "next/link";
import { getIndustries } from "@/lib/outrank";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Industries We Serve | Your Safety Partners",
  description: "Discover how our safety compliance software helps businesses across various industries maintain compliance and protect their workforce.",
};

export default async function IndustryIndex() {
  const industries = await getIndustries();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Industries We Serve</h1>
        <p className="text-lg text-muted-foreground">
          Safety compliance isn&apos;t one-size-fits-all. Explore our tailored solutions designed to meet the specific regulatory requirements and hazards of your industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry) => (
          <Link key={industry.slug} href={`/industry/${industry.slug}`} className="block group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {industry.h1.replace(' Software', '')}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {industry.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
