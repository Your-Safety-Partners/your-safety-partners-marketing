import path from "node:path";
import type { NextConfig } from "next";
import { MODULE_REDIRECTS } from "./lib/module-routes";

const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Keep module resolution inside this app. Without this, the dev server
  // looks for tailwindcss in the parent folder and fails.
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return MODULE_REDIRECTS;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      // If your Ghost site uses a custom domain, add that hostname here too:
      {
        protocol: 'https',
        hostname: 'your-safety-portal.ghost.io', 
      },
    ],
  },
};

export default nextConfig;
