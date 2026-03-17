# Your Safety Partners - Marketing Website

This is the official marketing website for Your Safety Partners, built with Next.js 14 and the App Router. It leverages a modern, headless architecture for optimal performance, SEO, and content management flexibility.

## Key Technologies

- **Framework**: [Next.js](https://nextjs.org) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **CMS (Pages)**: [Prismic](https://prismic.io) via Slice Machine
- **CMS (Blog)**: [Ghost](https://ghost.org)
- **Programmatic SEO**: Data-driven pages (from `lib/outrank.ts`)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)

---

## Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### 2. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.example .env.local
```

Now, fill in the required values in `.env.local`:

```env
# Ghost Content API Credentials
# Found in Ghost Admin -> Integrations -> Custom Integrations
GHOST_URL="https://your-site.ghost.io"
GHOST_CONTENT_API_KEY="your_content_api_key"

# Prismic API Endpoint
# The repository name can be found in your slicemachine.config.json file
# Example: https://your-repo-name.cdn.prismic.io/api/v2

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Running the Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

To run the Prismic Slice Machine locally, which allows you to create and model your page components, run:

```bash
npm run slicemachine
```

---

## Content Management Guide

This site pulls content from three distinct sources. This allows for specialized, best-in-class editing experiences for different types of content.

### 1. General Pages (Homepage, About, Features, etc.)

- **Service**: Prismic
- **What it does**: Manages structured page content using reusable components called "Slices". This is ideal for visually rich, custom-designed pages.
- **How to Edit**: 
    1. Log in to your Prismic repository: `https://yoursafetyportal.prismic.io`
    2. Navigate to the "Page" or "Home" Custom Types.
    3. Select a page to edit or create a new one.
    4. Add, remove, and reorder Slices to build the page.

### 2. Blog Posts

- **Service**: Ghost
- **What it does**: A powerful, clean interface specifically for writing and managing blog content.
- **How to Edit**:
    1. Log in to your Ghost Admin panel: `https://your-safety-portal.ghost.io/ghost`
    2. Navigate to the "Posts" section.
    3. Create a new post or edit an existing one using the rich text editor.

### 3. Programmatic SEO Pages (Industries & Comparisons)

- **Service**: Internal Data Source (`lib/outrank.ts`)
- **What it does**: These pages are generated automatically from a dataset. This is perfect for creating hundreds of similar pages targeting specific keywords (e.g., "Safety Software for X Industry").
- **How to Edit**:
    - **Currently**, these pages are powered by **mock data** inside the `lib/outrank.ts` file.
    - To connect the real data from an Outrank.so export (or any other API/JSON source), a **developer is required** to modify this file and replace the mock arrays with a real data fetch.

---

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build of the app.
- `npm run start`: Starts the production server.
- `npm run lint:fix`: Lints and automatically fixes code style issues.
- `npm run slicemachine`: Starts the Slice Machine development environment for Prismic.

## Deployment

The project is configured for easy deployment on [Vercel](https://vercel.com), the platform created by the developers of Next.js.
