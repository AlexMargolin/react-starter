/* eslint-disable @typescript-eslint/no-var-requires,max-lines */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

/**
 * default webpack configuration
 */
const defaults = {
  srcDir: "src",
  outputDir: "build",
  publicDir: "public",
  mainFile: "index.tsx",
}

/**
 * Append root path to passed args.
 * @param args
 */
const appendRoot = (...args) => {
  return path.resolve(__dirname, ...args)
}

/**
 * Returns a value based on active environment
 * @param dev
 * @param prod
 */
const envCmp = (dev, prod) => {
  return process.env.NODE_ENV === "development" ? dev : prod
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
 * Scss Rule.
 */
const scssRule = () => ({
  test: /\.scss$/,
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
          localIdentName: envCmp(
            "[local]-[contenthash:5]",
            "[contenthash:5]",
          ),
          exportLocalsConvention: "camelCaseOnly",
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
 * @type {HtmlWebpackPlugin}
 */
const htmlPlugin = new HtmlWebpackPlugin({
  inject: "body",
  title: process.env.npm_package_name,
  meta: {
    charset: "UTF-8",
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": appendRoot(defaults.srcDir),
    },
  },
  devServer: {
    hot: true,
    port: 9000,
    open: true,
    overlay: true,
    compress: true,
    host: "localhost",
    transportMode: "ws",
    contentBase: appendRoot(defaults.publicDir),
  },
  module: {
    rules: [tsRule(), scssRule()],
  },
  plugins: [cleanPlugin, htmlPlugin, cssExtractPlugin],
}
