import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper build output for Vercel
  trailingSlash: false,
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
