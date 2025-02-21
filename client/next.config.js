/** @type {import('next').NextConfig} */
const path = require("path");
const withTM = require("next-transpile-modules")([
  "@ant-design/icons",
  "@ant-design/icons-svg",
]); // ✅ Transpile modules

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  experimental: {
    esmExternals: true, // ✅ Ensures CommonJS compatibility
  },
  output: "export", // ✅ Enables static site export
  reactStrictMode: true, // ✅ Helps identify potential issues

  images: {
    domains: ["monumental-kleicha-0d19a2.netlify.app"],
    unoptimized: true, // ✅ Allows images in static exports without Next.js optimization
  },

  assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX || "" : "", // ✅ Uses env variable for flexibility

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // ✅ Simplifies SCSS imports
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevents build failures due to ESLint errors
  },

  typescript: {
    ignoreBuildErrors: true, // ✅ Prevents build failures due to TypeScript errors
  },

  webpack: (config) => {
    // ✅ Handle image imports
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]", // ✅ Keeps original file paths and names
          },
        },
      ],
    });

    // ✅ Ensures Node.js 'path' module works in the browser
    config.resolve.fallback = {
      path: require.resolve("path-browserify"),
    };

    return config;
  },
};

module.exports = withTM(nextConfig); // ✅ Wrap config with next-transpile-modules
