import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export const revalidate = 0; // 1 hour ISR caching

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("home", "home").catch(() => null);

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
  
  // Let's try getting it as a Reusable Type first
  let page = await client.getByUID("home", "home").catch(() => null);

  // If that fails, let's try getting it as a Single Type
  if (!page) {
    page = await client.getSingle("home").catch(() => null);
  }
  if (!page) {
    return (
      <div className="py-24 text-center px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-6">
          Next.js still cannot find the Prismic Document.
        </h1>
        <p className="text-lg">
          Check your VS Code terminal for the console.log.
        </p>
      </div>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
