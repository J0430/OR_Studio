/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true, // Disable the Image Optimization API
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // Add styles directory for SCSS
  },
};

module.exports = nextConfig;
