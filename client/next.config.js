const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  experimental: {
    esmExternals: true,
    reactRefresh: false,
  },
  reactStrictMode: true,
  images: {
    domains: ["monumental-kleicha-0d19a2.netlify.app"],
    unoptimized: true,
  },

  assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX || "" : "",

  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },

  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        "@svgr/webpack",
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    });

    config.resolve.fallback = {
      path: require.resolve("path-browserify"),
    };

    return config;
  },
};
