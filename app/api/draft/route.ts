import { draftMode } from 'next/headers';
import { redirectToPreviewURL } from '@prismicio/next';
import { createClient } from '@/prismicio';

export async function GET(request: Request) {
  const client = createClient();
  const draft = await draftMode();
  draft.enable();
  
  return await redirectToPreviewURL({ client, request });
}
