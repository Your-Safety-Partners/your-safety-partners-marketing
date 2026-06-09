import { NextResponse } from 'next/server';

import {
  getMicrosoftOAuthClientConfig,
  getMicrosoftOAuthRedirectUri,
} from '@/lib/microsoft-graph/config';

type TokenResponse = {
  refresh_token?: string;
  access_token?: string;
  error?: string;
  error_description?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const oauthError = searchParams.get('error_description') ?? searchParams.get('error');

  if (oauthError) {
    return NextResponse.json({ error: oauthError }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'Missing authorization code.' }, { status: 400 });
  }

  try {
    const { tenantId, clientId, clientSecret } = getMicrosoftOAuthClientConfig();

    const response = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: getMicrosoftOAuthRedirectUri(),
          grant_type: 'authorization_code',
          scope: 'Calendars.ReadWrite offline_access User.Read',
        }),
        cache: 'no-store',
      }
    );

    const data = (await response.json()) as TokenResponse;

    if (!response.ok || !data.refresh_token) {
      const detail = data.error_description || data.error || 'Token exchange failed.';
      return NextResponse.json({ error: detail }, { status: 500 });
    }

    return NextResponse.json({
      message:
        'Microsoft authorization succeeded. Copy the refresh token below into MICROSOFT_REFRESH_TOKEN in your environment variables.',
      refreshToken: data.refresh_token,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'OAuth callback failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
