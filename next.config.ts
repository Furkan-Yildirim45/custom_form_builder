import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // PDF worker alias'ını ekleyin
    config.resolve.alias["pdfjs-dist/build/pdf.worker"] = path.resolve(
      __dirname,
      "node_modules/pdfjs-dist/build/pdf.worker.entry.js"
    );
    return config;
  },
};

export default nextConfig;
