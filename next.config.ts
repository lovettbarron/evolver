import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./src/content/**/*'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // pdfjs-dist v5 ESM uses top-level code that breaks webpack bundling;
    // use the legacy build which is compatible
    config.resolve.alias['pdfjs-dist/build/pdf.mjs'] = 'pdfjs-dist/legacy/build/pdf.mjs';
    config.resolve.alias['pdfjs-dist/build/pdf.worker.min.mjs'] = 'pdfjs-dist/legacy/build/pdf.worker.min.mjs';
    return config;
  },
};

export default nextConfig;
