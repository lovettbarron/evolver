import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Content is read from filesystem, not fetched
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
