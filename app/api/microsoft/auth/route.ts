import { NextResponse } from 'next/server';

import { getMicrosoftOAuthRedirectUri } from '@/lib/microsoft-graph/config';

const SCOPES = ['Calendars.ReadWrite', 'offline_access', 'User.Read'];

export async function GET() {
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const tenantId = process.env.MICROSOFT_TENANT_ID?.trim();

  if (!clientId || !tenantId) {
    return NextResponse.json(
      {
        error:
          'Set MICROSOFT_CLIENT_ID and MICROSOFT_TENANT_ID before starting Microsoft OAuth.',
      },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: getMicrosoftOAuthRedirectUri(),
    response_mode: 'query',
    scope: SCOPES.join(' '),
    prompt: 'consent',
  });

  return NextResponse.redirect(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?${params.toString()}`
  );
}
