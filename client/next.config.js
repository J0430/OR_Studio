const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [],
  },
  eslint: {
    ignoreDuringBuilds: true, // disable ESLint error on Vercel if unused
  },
  webpack: (config) => {
    // Add custom file handling rules
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|svg|md)$/i,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.md$/,
        use: "ignore-loader",
      }
    );

    // Add path-browserify fallback
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      path: require.resolve("path-browserify"),
    };

    // Add TypeScript-friendly path aliases
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@components": path.resolve(__dirname, "components"),
      "@utils": path.resolve(__dirname, "utils"),
      "@styles": path.resolve(__dirname, "styles"),
      "@hooks": path.resolve(__dirname, "hooks"),
      "@contexts": path.resolve(__dirname, "contexts"),
      "@public": path.resolve(__dirname, "public"),
      "@data": path.resolve(__dirname, "public/data"),
    };

    return config;
  },
};

module.exports = nextConfig;
