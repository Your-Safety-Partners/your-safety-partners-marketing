import Link from "next/link";
import { getComparisons } from "@/lib/outrank";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Compare Safety Software | Your Safety Partners",
  description: "See how Your Safety Partners stacks up against other safety management solutions on the market.",
};

export const revalidate = 3600;

export default async function CompareIndex() {
  const comparisons = await getComparisons();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Compare Alternatives</h1>
        <p className="text-lg text-muted-foreground">
          Looking for the right safety software? See detailed breakdowns of how our platform compares to legacy solutions and competitors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparisons.map((comp) => (
          <Link key={comp.slug} href={`/compare/${comp.slug}`} className="block group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  vs {comp.slug.replace('competitor-', 'Competitor ').toUpperCase()}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {comp.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary">
                  Read comparison <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
