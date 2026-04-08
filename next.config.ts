import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./src/content/**/*'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // pdfjs-dist v5 has webpack compatibility issues — PDF viewer handles this gracefully
    return config;
  },
};

export default nextConfig;
