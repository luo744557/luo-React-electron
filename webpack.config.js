const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonStyleLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: ["postcss-preset-env"],
      },
    },
  },
];

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[contenthash:8].js",
  },
  rules: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: commonStyleLoader,
    },
    {
      test: /\.less$/i,
      use: [
        // compiles Less to CSS
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    },
  ],
  module: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].[contenthash:8].css",
    }),
  ],
};