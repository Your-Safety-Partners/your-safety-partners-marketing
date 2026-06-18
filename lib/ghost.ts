import GhostContentAPI, { type PostOrPage } from "@tryghost/content-api";

const url = process.env.GHOST_URL;
const key = process.env.GHOST_CONTENT_API_KEY;

export const isGhostConfigured = Boolean(url && key);

type GhostClient = InstanceType<typeof GhostContentAPI>;

let client: GhostClient | null | undefined;

function getGhostClient(): GhostClient | null {
  if (client !== undefined) {
    return client;
  }

  if (!url || !key) {
    client = null;
    return client;
  }

  client = new GhostContentAPI({
    url,
    key,
    version: "v5.0",
  });

  return client;
}

export async function getGhostPosts(): Promise<PostOrPage[]> {
  const ghost = getGhostClient();
  if (!ghost) return [];

  try {
    return await ghost.posts.browse({
      limit: "all",
      include: ["tags", "authors"],
    });
  } catch (error) {
    console.error("Failed to fetch posts from Ghost:", error);
    return [];
  }
}

export async function getGhostPostBySlug(slug: string): Promise<PostOrPage | null> {
  if (!slug) return null;

  const ghost = getGhostClient();
  if (!ghost) return null;

  try {
    return await ghost.posts.read({ slug }, { include: ["authors", "tags"] });
  } catch (error) {
    console.error("Ghost API request failed:", error);
    return null;
  }
}

export async function getGhostPostSlugs(): Promise<string[]> {
  const ghost = getGhostClient();
  if (!ghost) return [];

  try {
    const posts = await ghost.posts.browse({ limit: "all", fields: "slug" });
    return posts
      .map((post: Pick<PostOrPage, "slug">) => post.slug)
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error("Failed to fetch Ghost post slugs:", error);
    return [];
  }
}
