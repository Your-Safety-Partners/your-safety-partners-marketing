How This Project Works with Prismic and Next.js

  This is a Next.js 16 marketing site that uses Prismic as a headless CMS for page content management. Here's how everything works together:

  Architecture Overview

  Prismic Repository: yoursafetyportal (configured in slicemachine.config.json:2)
  - Manages content for homepage, about page, module pages, and generic pages
  - Uses a component-based approach with "Slices" (reusable page sections)
  - Content is stored in Prismic and fetched at build/request time

  Slice Machine: Local development tool for creating and managing Prismic content models
  - Slices are defined in /slices/ directory (19 different slices like HeroSection, CallToAction, etc.)
  - Custom types are defined in /customtypes/ (15 types like home, about_us, page, etc.)

  Key Commands

  # Install dependencies
  npm install

  # Start development server (Next.js)
  npm run dev                # http://localhost:3000

  # Start Slice Machine (Prismic content modeling)
  npm run slicemachine       # http://localhost:9999 (default port)

  # Build for production
  npm run build

  # Start production server
  npm start

  # Lint and fix code
  npm run lint:fix

  # Type checking
  npm run check-types

  How Prismic Integration Works

  1. Configuration (prismicio.ts:1-48)
  - Creates a Prismic client with your repository name
  - Defines routes mapping content types to URLs (home → /, page → /:uid)
  - Enables preview mode for content editors
  - Sets caching strategy (force-cache in production, 5s revalidation in dev)

  2. Content Types (customtypes/)
  Each folder represents a Prismic content type:
  - home - Homepage
  - about_us - About page
  - page - Generic pages
  - Module pages (contractor_module, forms_module, hazard_module, etc.)

  3. Slices (slices/)
  Reusable components like:
  - HeroSection
  - CallToAction
  - Testimonial
  - Companies
  - Industries
  - etc.

  4. Pages in Next.js
  Pages fetch data from Prismic using the client:

  import { createClient } from '@/prismicio'

  // In page components
  const client = createClient()
  const page = await client.getByUID('page', params.slug)

  Development Workflow

  Working with Content:

  1. Start Slice Machine:
  npm run slicemachine
  1. This opens http://localhost:9999 where you can:
    - Create/edit Slices (components)
    - Define Custom Types (content models)
    - Push changes to Prismic
  2. Start Next.js Dev Server:
  npm run dev
  2. Your site runs at http://localhost:3000
  3. Edit Content in Prismic:
    - Go to https://yoursafetyportal.prismic.io
    - Create/edit documents
    - Changes appear on your local site (with 5s revalidation)
  4. Preview Mode:
    - Available at /api/preview and /api/draft
    - Allows content editors to preview unpublished changes

  Environment Setup

  Your .env file needs Prismic repository configured (already set via slicemachine.config.json). You may also want:

  NEXT_PUBLIC_SITE_URL=http://localhost:3000

  The Prismic repository name (yoursafetyportal) is automatically pulled from slicemachine.config.json.

  Content Management

  Three Content Sources:
  1. Prismic - Main pages (Home, About, Modules)
  2. Ghost - Blog posts (separate CMS)
  3. Internal Data - Programmatic SEO pages (industries, comparisons)

  Each has its own editing interface and workflow.
