import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
export async function POST() {
  // Log this so you can check Vercel logs to confirm Prismic is hitting this endpoint
  console.log('🚀 Prismic Webhook received: Revalidating cache...');
  // 1. Clear the data-level cache (fetch tags)
  revalidateTag('prismic', 'max');
  // 2. Clear the page-level cache (HTML)
  // This ensures the layout and all its children are refreshed
  revalidatePath('/', 'layout');
  return NextResponse.json({ 
    revalidated: true, 
    tag: 'prismic', 
    now: Date.now() 
  });
}
