import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu.acc01.titanos.tv",
      },
      {
        protocol: "https",
        hostname: "acc01.titanos.tv",
      },
    ],
  },
};

export default nextConfig;
