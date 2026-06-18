import { MetadataRoute } from 'next';
import { PageDocument } from '#prismicio-types.js';
import { createClient } from '@/prismicio';
import { getIndustries } from '@/lib/outrank';
import { MODULE_SITEMAP_PATHS } from '@/lib/module-routes';
import { SITE_URL } from '@/lib/seo-metadata';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // 1. Static/Base routes
  const routes = [
    '',
    '/contact',
    '/book-a-demo',
    '/features',
    '/about-us',
    '/industry',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Prismic Pages
  let prismicPages: PageDocument[] = [];
  try {
    prismicPages = await client.getAllByType('page');
  } catch (e) {
    console.error('Sitemap Prismic Error:', e);
  }
  const prismicRoutes = prismicPages.map((page) => ({
    url: `${baseUrl}/${page.uid}`,
    lastModified: new Date(page.last_publication_date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Outrank programmatic industry pages
  let industryRoutes: MetadataRoute.Sitemap = [];
  try {
    const industries = await getIndustries();
    industryRoutes = industries.map((ind) => ({
      url: `${baseUrl}/industry/${ind.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error('Sitemap Outrank Error:', e);
  }

  const moduleRoutes = MODULE_SITEMAP_PATHS.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...prismicRoutes, ...moduleRoutes, ...industryRoutes];
}
