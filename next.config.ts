import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "badges.gumlet.io",
      },
    ],
  },
};

export default nextConfig;
