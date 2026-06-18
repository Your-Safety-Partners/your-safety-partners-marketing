import { notFound } from 'next/navigation';
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { canonicalAlternates, formatTitleWithBrand, getPageSeo } from "@/lib/seo-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const SINGLE_TYPE_SLUG_MAP = {
  'about-us': 'about_us',
} as const;

async function getDocumentBySlug(slug: string) {
  const client = createClient();
  const singleType = SINGLE_TYPE_SLUG_MAP[slug as keyof typeof SINGLE_TYPE_SLUG_MAP];

  if (singleType) {
    return client.getSingle(singleType).catch(() => null);
  }

  const page = await client.getByUID('page', slug).catch(() => null);
  if (page) return page;

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDocumentBySlug(slug);

  if (!page) return {};

  const seo = getPageSeo(slug);
  const fallbackTitle = formatTitleWithBrand(
    slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  );
  const title = seo?.title ?? page.data.meta_title ?? fallbackTitle;
  const description = seo?.description ?? page.data.meta_description ?? undefined;

  return {
    title,
    description,
    alternates: canonicalAlternates(`/${slug}`),
    openGraph: {
      title,
      description,
      images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getDocumentBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ pageSlug: slug }}
    />
  );
}
