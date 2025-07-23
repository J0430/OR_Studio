webpack: (config) => {
  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif|svg|md)$/i,
      use: [
        "@svgr/webpack",
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    },
    {
      test: /\.md$/,
      use: "ignore-loader",
    }
  );

  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
  };

  // ✅ Add these aliases so Webpack understands @components, @utils, etc.
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
};
