import Webpack from "webpack"
import { appendRoot } from "../webpack/webpack.utils"
import { defaults } from "../webpack/webpack.defaults"
import configuration from "../webpack/webpack.config"
import WebpackDevServer, { Configuration } from "webpack-dev-server"

const devServerConfiguration: Configuration = {
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

const compiler = Webpack(configuration)

const devServer = new WebpackDevServer(
  compiler,
  devServerConfiguration,
)

devServer.listen(
  devServerConfiguration.port,
  devServerConfiguration.host,
)
