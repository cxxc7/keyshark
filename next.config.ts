import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ Enables static HTML export (replaces `next export`)
  devIndicators: {
    buildActivity: true, // Optional, helpful during development
  },
};

export default nextConfig;
