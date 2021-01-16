import { defaults } from "./webpack.defaults"
import { appendRoot, envCmp } from "./webpack.utils"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

/**
 * HtmlWebpackPlugin instance.
 */
export const htmlPlugin = new HtmlWebpackPlugin({
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

/**
 * MiniCssExtractPlugin instance.
 */
export const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: envCmp(
    "[name]-[contenthash:5].css",
    "[contenthash:5].css",
  ),
  chunkFilename: envCmp(
    "[name]-[contenthash:5].css",
    "[contenthash:5].css",
  ),
})
