import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [],
    unoptimized: true, // Required for static export compatibility
  },
  // Static export compatible — no backend needed
  trailingSlash: false,
};

export default nextConfig;
