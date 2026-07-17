import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import config from './slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 */
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'about_us',
    path: '/about-us',
  },
  {
<<<<<<< HEAD
    type: 'privacy_policy',
    path: '/privacy-policy',
=======
    type: 'industry',
    path: '/industry/:uid',
  },
  {
    type: 'demand_page',
    path: '/:uid',
>>>>>>> 346d2b24a2aa69586c8aa76950183790e2f61a77
  },
  {
    type: 'page',
    path: '/:uid',
  },
];

/**
 * Creates a Prismic client for the project's repository.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    ...config,
  });

  return client;
};
