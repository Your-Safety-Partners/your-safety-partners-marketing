type Props = {
  params: Promise<{ slug: string }>;
};

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tighter mb-6 capitalize">Safety Compliance for {slug.replace(/-/g, ' ')}</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground">
          [Outrank Programmatic Page Placeholder] - This route (&quot;/industry/{slug}&quot;) will pull structured data from Outrank.so to generate highly targeted SEO content for specific industries.
        </p>
      </div>
    </div>
  );
}
