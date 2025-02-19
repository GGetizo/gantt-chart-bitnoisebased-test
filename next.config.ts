import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // This ensures that SVG files are loaded as React components using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
