import type { NextConfig } from "next";
import { MODULE_REDIRECTS } from "./lib/module-routes";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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
