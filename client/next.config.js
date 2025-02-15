/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  // Enables static site generation/export
  output: "export",

  sassOptions: {
    // Include the styles directory for SCSS/SASS resolution
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    // Required for static export: disables Next.js image optimization
    unoptimized: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // Allows importing SVGs as React components
    });
    return config;
  },
};

module.exports = nextConfig;
