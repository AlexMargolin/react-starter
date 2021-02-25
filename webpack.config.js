/* eslint-disable max-lines */
const webpack = require("webpack")
const envs = require("./env.config")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { appendRoot, envCmp } = require("./scripts/utils")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

/**
 * default paths & files.
 */
const defaults = {
  srcDir: "src",
  outputDir: "build",
  publicDir: "public",
  mainFile: "index.tsx",
}

/**
 * Typescript Rule.
 */
const tsRule = () => ({
  test: /\.(ts|tsx)$/,
  use: {
    loader: "ts-loader",
    options: {
      logInfoToStdOut: true,
    },
  },
  include: [appendRoot(defaults.srcDir)],
})

/**
 * Style Rule.
 */
const styleRule = () => ({
  test: /\.(css|scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    {
      loader: "css-loader",
      options: {
        sourceMap: envCmp(true, false),
        modules: {
          auto: true,
          localIdentName: envCmp(
            "[local]-[contenthash:5]",
            "[contenthash:5]",
          ),
          exportLocalsConvention: "camelCase",
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        sourceMap: envCmp(true, false),
      },
    },
  ],
})

/**
 * Images Rule.
 */
const imagesRule = () => ({
  test: /\.(svg|png|jpe?g|gif)$/,
  type: "asset/resource",
  generator: {
    filename: envCmp(
      "assets/[name]-[contenthash:5][ext]",
      "assets/[contenthash:5][ext]",
    ),
  },
})

/**
 * @type {HtmlWebpackPlugin}
 */
const htmlPlugin = new HtmlWebpackPlugin({
  inject: "head",
  title: process.env.npm_package_name,
  meta: {
    charset: "UTF-8",
    description: "Minimal dependency React Starter",
  },
  template: appendRoot(defaults.publicDir, "index.ejs"),
  favicon: appendRoot(defaults.publicDir, "favicon.svg"),
})

/**
 * @type {MiniCssExtractPlugin}
 */
const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: envCmp(
    "[name]-[contenthash:5].css",
    "[contenthash:5].css",
  ),
  chunkFilename: envCmp(
    "[name]-[contenthash:5].css",
    "[contenthash:5].css",
  ),
})

/**
 * @type {CleanWebpackPlugin}
 */
const cleanPlugin = new CleanWebpackPlugin({
  cleanStaleWebpackAssets: true,
})

/**
 * @type {webpack.EnvironmentPlugin}
 */
const environmentPlugin = new webpack.EnvironmentPlugin(envs)

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  bail: envCmp(false, true),
  mode: envCmp("development", "production"),
  devtool: envCmp("inline-source-map", false),
  entry: {
    main: appendRoot(defaults.srcDir, defaults.mainFile),
  },
  output: {
    path: appendRoot(defaults.outputDir),
    filename: envCmp(
      "[name]-[contenthash:5].js",
      "[contenthash:5].js",
    ),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          enforce: true,
          name: "vendor",
          chunks: "initial",
          test: /node_modules/,
        },
      },
    },
  },
  experiments: {
    asset: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": appendRoot(defaults.srcDir),
    },
  },
  devServer: {
    hot: true,
    port: 9000,
    overlay: true,
    compress: true,
    host: "localhost",
    transportMode: "ws",
    stats: "errors-only",
    contentBase: appendRoot(defaults.publicDir),
  },
  module: {
    rules: [tsRule(), styleRule(), imagesRule()],
  },
  plugins: [
    htmlPlugin,
    cleanPlugin,
    cssExtractPlugin,
    environmentPlugin,
  ],
}
