// app/blog/[slug]/page.tsx
import ghost from "@/lib/ghost";
import { sanitizeHtmlForDangerouslySetInnerHTML } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { PostOrPage } from "@tryghost/content-api";

async function getPost(slug: string): Promise<PostOrPage | null> {
  if (!slug) return null;
  try {
    return await ghost.posts.read(
      { slug }, 
      { include: ['authors', 'tags'] }
    );
  } catch (error) {
    console.error("Ghost API Request Failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const posts = await ghost.posts.browse({ limit: 'all', fields: 'slug' });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ slug: string }>; // Fix: params is a Promise
};

export default async function BlogPost({ params }: Props) {
  // Fix: Unwrap the promise
  const { slug } = await params;
  
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const postDate = new Date(post.published_at || new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sanitizedHtml = sanitizeHtmlForDangerouslySetInnerHTML(post.html || "");

  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{post.title}</h1>
        <p className="text-muted-foreground">
          Published on {postDate} • By {post.authors?.[0]?.name || 'Safety Expert'}
        </p>
      </header>
      <div
        className="prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </article>
  );
}
