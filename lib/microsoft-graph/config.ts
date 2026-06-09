export type MicrosoftGraphConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export function isMicrosoftCalendarConfigured(): boolean {
  return Boolean(
    process.env.MICROSOFT_TENANT_ID?.trim() &&
      process.env.MICROSOFT_CLIENT_ID?.trim() &&
      process.env.MICROSOFT_CLIENT_SECRET?.trim() &&
      process.env.MICROSOFT_REFRESH_TOKEN?.trim()
  );
}

export function getMicrosoftGraphConfig(): MicrosoftGraphConfig {
  const tenantId = process.env.MICROSOFT_TENANT_ID?.trim();
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET?.trim();
  const refreshToken = process.env.MICROSOFT_REFRESH_TOKEN?.trim();

  if (!tenantId || !clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Microsoft Teams calendar is not configured. Set MICROSOFT_TENANT_ID, MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, and MICROSOFT_REFRESH_TOKEN.'
    );
  }

  return { tenantId, clientId, clientSecret, refreshToken };
}

export function getMicrosoftOAuthClientConfig(): {
  tenantId: string;
  clientId: string;
  clientSecret: string;
} {
  const tenantId = process.env.MICROSOFT_TENANT_ID?.trim();
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET?.trim();

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      'Microsoft OAuth is not configured. Set MICROSOFT_TENANT_ID, MICROSOFT_CLIENT_ID, and MICROSOFT_CLIENT_SECRET.'
    );
  }

  return { tenantId, clientId, clientSecret };
}

export function getMicrosoftOAuthRedirectUri(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000';
  return `${siteUrl.replace(/\/$/, '')}/api/microsoft/auth/callback`;
}
