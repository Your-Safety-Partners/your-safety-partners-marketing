export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tighter mb-6">Safety Blog</h1>
      <p className="text-lg text-muted-foreground mb-12">
        [Ghost Blog Index Placeholder] - This route ("/blog") will fetch the latest articles, tags, and authors from the Ghost Content API.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="h-48 bg-muted rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sample Article {i}</h2>
            <p className="text-muted-foreground text-sm">A brief excerpt of the safety article will appear here. Sourced from Ghost.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
