import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  
  // In the future, this will fetch the document from Prismic
  // const page = await client.getByUID("page", slug);
  // if (!page) return notFound();

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tighter mb-6 capitalize">{slug.replace(/-/g, ' ')}</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground">
          [Prismic Page Placeholder] - This catch-all route ("/{slug}") will fetch the repeatable "Page" document from Prismic and render its slices.
        </p>
      </div>
    </div>
  );
}
