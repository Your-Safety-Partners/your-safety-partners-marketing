import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {
  MODULE_ROUTES,
  getModuleByUrlSlug,
  getModulePath,
  type ModulePrismicType,
} from "@/lib/module-routes";
import {
  canonicalAlternates,
  formatTitleWithBrand,
  getPageSeo,
} from "@/lib/seo-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getModuleDocument(prismicType: ModulePrismicType) {
  const client = createClient();
  return client.getSingle(prismicType).catch(() => null);
}

export async function generateStaticParams() {
  return MODULE_ROUTES.map((module) => ({ slug: module.urlSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const moduleRoute = getModuleByUrlSlug(slug);

  if (!moduleRoute) return {};

  const page = await getModuleDocument(moduleRoute.prismicType);
  if (!page) return {};

  const seo = getPageSeo(moduleRoute.prismicType);
  const fallbackTitle = formatTitleWithBrand(
    slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  );
  const title = seo?.title ?? page.data.meta_title ?? fallbackTitle;
  const description = seo?.description ?? page.data.meta_description ?? undefined;
  const canonicalPath = getModulePath(moduleRoute.urlSlug);

  return {
    title,
    description,
    alternates: canonicalAlternates(canonicalPath),
    openGraph: {
      title,
      description,
      images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
    },
  };
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const moduleRoute = getModuleByUrlSlug(slug);

  if (!moduleRoute) {
    notFound();
  }

  const page = await getModuleDocument(moduleRoute.prismicType);

  if (!page) {
    notFound();
  }

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ pageSlug: moduleRoute.urlSlug }}
    />
  );
}
