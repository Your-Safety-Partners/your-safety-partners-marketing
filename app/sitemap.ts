import { MetadataRoute } from 'next';
import { createClient } from '@/prismicio';
import ghost from '@/lib/ghost';
import { getIndustries, getComparisons } from '@/lib/outrank';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yoursafetypartners.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // 1. Static/Base routes
  const routes =[
    '',
    '/contact',
    '/industry',
    '/compare',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Prismic Pages
  let prismicPages: any[] =[];
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

  // 3. Ghost Blog Posts
  let ghostPosts: PostOrPage[] = [];
  try {
    ghostPosts = await ghost.posts.browse({ limit: 'all' });
  } catch (e) {
    console.error('Sitemap Ghost Error:', e);
  }
  const ghostRoutes = ghostPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 4. Outrank Programmatic Pages
  let industryRoutes: MetadataRoute.Sitemap = [];
  let compareRoutes: MetadataRoute.Sitemap = [];
  try {
    const industries = await getIndustries();
    industryRoutes = industries.map((ind) => ({
      url: `${baseUrl}/industry/${ind.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const comparisons = await getComparisons();
    compareRoutes = comparisons.map((comp) => ({
      url: `${baseUrl}/compare/${comp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error('Sitemap Outrank Error:', e);
  }

  return [...routes, ...prismicRoutes, ...ghostRoutes, ...industryRoutes, ...compareRoutes];
}
