const path = require("path")
const config = require("./config")
const {merge} = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        filename: "[name].js"
    },
    performance: {
        hints: 'warning',
    },
    devServer: {
        port: 9000,
        open: true,
        noInfo: true,
        overlay: true,
        compress: true,
        watchContentBase: true,
        contentBase: path.resolve(config.rootPath, config.publicDir)
    }
})
