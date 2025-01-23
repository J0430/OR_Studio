/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.cache = false; // Disable caching
    return config;
  },
};

export default nextConfig;
