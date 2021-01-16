/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack")
const defaults = require("../webpack/defaults")
const { appendRoot } = require("../webpack/utils")
const WebpackDevServer = require("webpack-dev-server")
const configuration = require("../webpack/webpack.config")

const devServerConfiguration = {
  hot: true,
  port: 9000,
  open: true,
  quiet: true,
  overlay: true,
  compress: true,
  host: "localhost",
  transportMode: "ws",
  watchContentBase: true,
  clientLogLevel: "none",
  contentBase: appendRoot(defaults.publicDir),
}

const compiler = webpack(configuration)

const devServer = new WebpackDevServer(
  compiler,
  devServerConfiguration,
)

devServer.listen(
  devServerConfiguration.port,
  devServerConfiguration.host,
)
