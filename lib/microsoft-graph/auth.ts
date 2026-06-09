import { getMicrosoftGraphConfig } from '@/lib/microsoft-graph/config';

const GRAPH_SCOPE = 'https://graph.microsoft.com/Calendars.ReadWrite offline_access';

type TokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

export async function getMicrosoftGraphAccessToken(): Promise<string> {
  const { tenantId, clientId, clientSecret, refreshToken } = getMicrosoftGraphConfig();

  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: GRAPH_SCOPE,
      }),
      cache: 'no-store',
    }
  );

  const data = (await response.json()) as TokenResponse;

  if (!response.ok || !data.access_token) {
    const detail = data.error_description || data.error || 'Unknown token error';
    throw new Error(`Failed to authenticate with Microsoft Graph: ${detail}`);
  }

  return data.access_token;
}
