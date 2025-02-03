/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  // ✅ Ensure static export is enabled
  output: "export",

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // If using SCSS
  },

  images: {
    unoptimized: true, // ✅ Required for static exports
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // ✅ Ensures SVGs work correctly in Next.js
    });
    return config;
  },
};

module.exports = nextConfig;
