import merge from "webpack-merge"
import { RuleSetRule } from "webpack"
import webpackCommonConfig from "./webpack.common"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const styleRules: RuleSetRule = {
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        modules: {},
      },
    },
    {
      loader: "css-loader",
      options: {
        sourceMap: false,
        modules: {
          localIdentName: "[hash:5]",
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: false,
        implementation: require("sass"),
      },
    },
  ],
}

const webpackProdConfig = merge(webpackCommonConfig, {
  mode: "production",
  bail: true,
  output: {
    filename: "[contenthash:5].js",
  },
  module: {
    rules: [styleRules],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[contenthash:5].css",
      chunkFilename: "[contenthash:5].css",
    }),
  ],
})

export default webpackProdConfig
