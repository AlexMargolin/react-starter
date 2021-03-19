/**
 * Define Node Environment
 * @type {string}
 */
process.env.NODE_ENV = "production"

const webpack = require("webpack")
const config = require("../webpack.config")

/**
 * @type {webpack.Compiler}
 */
const compiler = webpack(config)

/**
 * Run & show errors / logs
 */
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

  const log = stats.toString({
    colors: true,
    assets: false,
    modules: false,
  })

  console.log(log)
})
