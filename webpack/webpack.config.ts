import { Configuration } from "webpack"
import * as rules from "./webpack.rules"
import * as plugins from "./webpack.plugins"
import { defaults } from "./webpack.defaults"
import { appendRoot, envCmp } from "./webpack.utils"

const configuration: Configuration = {
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

export default configuration
