import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PAGE_SEO, canonicalAlternates } from "@/lib/seo-metadata";

// export const revalidate = 3600; // 1 hour ISR caching

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => null);

  const seo = PAGE_SEO.home;

  if (!page) {
    return {
      ...seo,
      alternates: canonicalAlternates("/"),
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: canonicalAlternates("/"),
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
    },
  };
}

export default async function Home() {
  const client = createClient();

  const page = await client.getSingle("home").catch((error) => {
    console.error("Failed to fetch Prismic home document:", error);
    return null;
  });

  if (!page) {
    return (
      <div className="py-24 text-center px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-6">
          Next.js cannot find the published Prismic home document.
        </h1>
        <p className="text-lg">
          Check the dev server terminal for the fetch error.
        </p>
      </div>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
