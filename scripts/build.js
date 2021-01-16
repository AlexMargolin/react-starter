/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack")
const configuration = require("../webpack/webpack.config")

const compiler = webpack(configuration)
compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err)
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
})
