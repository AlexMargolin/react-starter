/* eslint-disable @typescript-eslint/no-var-requires */
const defaults = require("./defaults")
const { appendRoot, envCmp } = require("./utils")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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

module.exports = {
  tsRule,
  scssRule,
}
