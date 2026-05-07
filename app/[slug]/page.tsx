import { notFound } from 'next/navigation';
import { Metadata } from "next"; 
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Props = {
  params: Promise<{ slug: string }>;
};

const MODULE_CUSTOM_TYPES = [
  'inspection_module',
  'policies_module',
  'forms_module',
  'training_module',
  'hazard_module',
  'contractor_module',
] as const;

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

  if (MODULE_CUSTOM_TYPES.includes(slug as (typeof MODULE_CUSTOM_TYPES)[number])) {
    return client
      .getSingle(slug as (typeof MODULE_CUSTOM_TYPES)[number])
      .catch(() => null);
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDocumentBySlug(slug);

  if (!page) return {};

  return {
    title:
      page.data.meta_title ||
      `${slug
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())} | Your Safety Partners`,
    description: page.data.meta_description,
    openGraph: {
      title:
        page.data.meta_title ||
        `${slug
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())} | Your Safety Partners`,
      description: page.data.meta_description || undefined,
      images: page.data.meta_image?.url ?[page.data.meta_image.url] :[],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getDocumentBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
