import { RuleSetRule } from "webpack"
import { defaults } from "./webpack.defaults"
import { appendRoot, envCmp } from "./webpack.utils"
import MiniCssExtractPlugin, {
  LoaderOptions,
} from "mini-css-extract-plugin"

/**
 * Typescript loader rule.
 */
export const tsRule = (): RuleSetRule => ({
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
 * SCSS loader rule.
 */
export const scssRule = (): RuleSetRule => ({
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {} as LoaderOptions,
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
