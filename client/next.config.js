// next.config.js
import path from "path";
import withTM from "next-transpile-modules";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  output: "export",
  reactStrictMode: true,

  images: {
    domains: ["monumental-kleicha-0d19a2.netlify.app"],
    unoptimized: false,
  },

  assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX || "" : "",

  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },

  eslint: {
    ignoreDuringBuilds: true,
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

export default withTM(["@ant-design/icons", "@ant-design/icons-svg"])(
  nextConfig
);
