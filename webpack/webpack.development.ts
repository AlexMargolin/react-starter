import path from "path"
import merge from "webpack-merge"
import { RuleSetRule } from "webpack"
import webpackConfig from "./webpack.config"
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
        sourceMap: true,
        modules: {
          localIdentName: "[local]-[contenthash:5]",
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
        implementation: require("sass"),
      },
    },
  ],
}

const webpackDevConfig = merge(webpackCommonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name]-[contenthash:5].js",
  },
  performance: {
    hints: "warning",
  },
  devServer: {
    port: 9000,
    noInfo: true,
    overlay: true,
    compress: true,
    watchContentBase: true,
    contentBase: path.resolve(
      webpackConfig.rootPath,
      webpackConfig.publicDir,
    ),
  },
  module: {
    rules: [styleRules],
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: "[id].css",
      filename: "[name]-[contenthash:5].css",
    }),
  ],
})

export default webpackDevConfig
