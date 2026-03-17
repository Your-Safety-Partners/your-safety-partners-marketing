import ghost from "@/lib/ghost";
import type { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import Image from 'next/image';

async function getPosts() {
  try {
    return await ghost.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
    });
  } catch (error) {
    console.error("Failed to fetch posts from Ghost:", error);
    return [];
  }
}

function BlogCard({ post }: { post: PostOrPage }) {
  const postDate = new Date(post.published_at || new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="flex flex-col rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {post.feature_image && (
        <div className="relative h-48 w-full">
            <Image
                src={post.feature_image}
                alt={post.feature_image_alt || post.title || 'Blog post image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-lg object-cover"
            />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2 leading-snug">{post.title}</h2>
        <p className="text-muted-foreground text-sm mb-4 flex-1">{post.excerpt}</p>
        <div className="text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
            <span>{post.authors?.[0]?.name}</span> &bull; <span>{postDate}</span>
        </div>
      </div>
    </Link>
  );
}

export const revalidate = 3600;

export const metadata = {
  title: "Safety Blog | Your Safety Partners",
  description: "Insights and updates on safety compliance and best practices.",
  openGraph: {
    title: "Safety Blog | Your Safety Partners",
    description: "Insights and updates on safety compliance and best practices.",
  }
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tighter mb-6">Safety Blog</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Insights and updates on safety compliance and best practices.
      </p>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No articles found. Please check the Ghost integration.</p>
      )}
    </div>
  );
}
