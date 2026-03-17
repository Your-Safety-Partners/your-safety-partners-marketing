// import { notFound } from "next/navigation";
import { Metadata } from "next"; 
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = createClient();
  const page = await client.getByUID("page", slug).catch(() => null);

  if (!page) return {};

  return {
    title: page.data.meta_title || `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | Your Safety Partners`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | Your Safety Partners`,
      description: page.data.meta_description || undefined,
      images: page.data.meta_image?.url ?[page.data.meta_image.url] :[],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const client = createClient();
  
  const page = await client.getByUID("page", slug).catch(() => null);

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold tracking-tighter mb-6 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            [Prismic Page Placeholder] - Create a &quot;page&quot; repeatable type in Prismic with UID &quot;{slug}&quot; to replace this.
          </p>
        </div>
      </div>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
