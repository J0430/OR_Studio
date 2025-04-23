const nextConfig = {
  output: "export",
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "ignore-loader", // <- Ignores all .md files during import
    });
    return config;
  },
};

export default nextConfig;
