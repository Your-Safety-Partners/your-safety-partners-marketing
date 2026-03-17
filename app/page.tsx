export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
        Welcome to <span className="text-primary">Your Safety Partners</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-[600px] mb-8">
        [Prismic Home Page Placeholder] - This route ("/") will fetch the single-type "Home" document from Prismic and render the dynamic slices.
      </p>
    </div>
  );
}
