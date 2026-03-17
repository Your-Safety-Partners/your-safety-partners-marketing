import GhostContentAPI from '@tryghost/content-api';

const url = process.env.GHOST_URL;
const key = process.env.GHOST_CONTENT_API_KEY;

if (!url || !key) {
  throw new Error(
    'GHOST_URL and GHOST_CONTENT_API_KEY are required environment variables. Please check your .env.local file.'
  );
}

// Create API instance with site credentials
const api = new GhostContentAPI({
  url,
  key,
  version: 'v5.0',
});

export default api;
