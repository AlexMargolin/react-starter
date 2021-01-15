import path from "path"
import webpackConfig from "./webpack.config"
import { RuleSetRule, Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

const htmlPluginOptions: HtmlWebpackPlugin.Options = {
  title: process.env.npm_package_name,
  meta: {
    charset: "UTF-8",
  },
  templateParameters: {
    rootID: webpackConfig.rootID,
  },
  template: path.resolve(
    webpackConfig.rootPath,
    webpackConfig.publicDir,
    "index.ejs",
  ),
  favicon: path.resolve(
    webpackConfig.rootPath,
    webpackConfig.publicDir,
    "favicon.svg",
  ),
}

const TypeScriptRules: RuleSetRule = {
  test: /\.(ts|tsx)$/,
  use: {
    loader: "ts-loader",
    options: {
      logInfoToStdOut: true,
    },
  },
  include: [path.resolve(webpackConfig.rootPath, "src")],
}

const webpackCommonConfig: Configuration = {
  entry: path.resolve(webpackConfig.rootPath, "src/index.ts"),
  output: {
    path: path.resolve(
      webpackConfig.rootPath,
      webpackConfig.outputDir,
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(webpackConfig.rootPath, "src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [TypeScriptRules],
  },
  plugins: [new HtmlWebpackPlugin(htmlPluginOptions)],
}

export default webpackCommonConfig
