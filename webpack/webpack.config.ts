import path from "path"

const webpackConfig = {
  rootID: "app",
  outputDir: "build",
  publicDir: "public",
  rootPath: path.dirname(__dirname),
}

export default webpackConfig
