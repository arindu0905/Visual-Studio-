import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Current Visual Studios Plus media library (see src/lib/assets.ts)
      { protocol: "https", hostname: "visualstudiosplus.com", pathname: "/wp-content/uploads/**" },
      // YouTube poster frames for the film projects
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  async redirects() {
    // Keep the old WordPress URL working for SEO and shared links.
    return [{ source: "/photography-portfolio", destination: "/photography", permanent: true }];
  },
};

export default nextConfig;
