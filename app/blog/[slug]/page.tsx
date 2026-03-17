type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-4 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <p className="text-muted-foreground">Published on Ghost • By Safety Expert</p>
      </header>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground">
          [Ghost Article Placeholder] - This route ("/blog/{slug}") will fetch the specific blog post content and metadata from the Ghost Content API.
        </p>
      </div>
    </article>
  );
}
