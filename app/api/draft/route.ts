import { draftMode } from 'next/headers';
import { redirectToPreviewURL } from '@prismicio/next';
import { createClient } from '@/prismicio';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const client = createClient();
  const draft = await draftMode();
  draft.enable();
  
  return await redirectToPreviewURL({ client, request });
}
