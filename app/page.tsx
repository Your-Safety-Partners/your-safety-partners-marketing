import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export const revalidate = 3600; // 1 hour ISR caching

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => null);

  if (!page) return { title: "Your Safety Partners" };

  return {
    title: page.data.meta_title || "Your Safety Partners",
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || "Your Safety Partners",
      description: page.data.meta_description || undefined,
      images: page.data.meta_image?.url ? [page.data.meta_image.url] :[],
    },
  };
}

export default async function Home() {
  const client = createClient();
  
  const page = await client.getSingle("home").catch(() => null);

  if (!page) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
          Welcome to <span className="text-primary">Your Safety Partners</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mb-8">
          [Prismic Home Page Placeholder] - Create a &quot;home&quot; singleton in Prismic with slices to replace this.
        </p>
      </div>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
