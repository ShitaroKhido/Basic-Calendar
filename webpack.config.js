const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: isProduction ? "[name].[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Ensures the output directory is clean
  },
  devServer: {
    static: "./dist",
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name].[contenthash].css" : "[name].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Basic Calendar",
      filename: "index.html",
      template: "./src/template.html",
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
};
