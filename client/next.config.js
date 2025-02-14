/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  output: "export",

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    unoptimized: true, // Required for static export
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // Allows SVG imports as React components
    });
    return config;
  },

  swcMinify: true, // Optional: Minifies the code for smaller builds
};

module.exports = nextConfig;
