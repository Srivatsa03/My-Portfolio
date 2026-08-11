import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Style lint should not block a deploy; type checking still runs.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.animatedimages.org',
        pathname: '/data/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
