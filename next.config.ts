import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./src/content/**/*'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // pdfjs-dist v5 ESM uses top-level code that breaks webpack bundling;
    // alias bare import + specific paths to legacy build
    const path = require('path');
    const pdfjsLegacy = path.join(__dirname, 'node_modules/pdfjs-dist/legacy/build/pdf.mjs');
    config.resolve.alias['pdfjs-dist'] = pdfjsLegacy;
    config.resolve.alias['pdfjs-dist/build/pdf.mjs'] = pdfjsLegacy;
    config.resolve.alias['pdfjs-dist/build/pdf.worker.mjs'] = path.join(__dirname, 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
    config.resolve.alias['pdfjs-dist/build/pdf.worker.min.mjs'] = path.join(__dirname, 'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs');
    return config;
  },
};

export default nextConfig;
