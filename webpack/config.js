/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require("./rules")
const plugins = require("./plugins")
const defaults = require("./defaults")
const { envCmp, appendRoot } = require("./utils")

module.exports = {
  bail: envCmp(false, true),
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
  mode: envCmp("development", "production"),
  devtool: envCmp("inline-source-map", false),
  module: {
    rules: [rules.tsRule(), rules.scssRule()],
  },
  plugins: [plugins.htmlPlugin, plugins.cssExtractPlugin],
}
