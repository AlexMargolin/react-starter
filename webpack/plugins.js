/* eslint-disable @typescript-eslint/no-var-requires */
const defaults = require("./defaults")
const { appendRoot, envCmp } = require("./utils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const htmlPlugin = new HtmlWebpackPlugin({
  title: process.env.npm_package_name,
  meta: {
    charset: "UTF-8",
  },
  templateParameters: {
    rootID: defaults.rootId,
  },
  template: appendRoot(defaults.publicDir, "index.ejs"),
  favicon: appendRoot(defaults.publicDir, "favicon.svg"),
})

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

module.exports = {
  htmlPlugin,
  cssExtractPlugin,
}
