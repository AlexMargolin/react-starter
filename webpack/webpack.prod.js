const config = require("./config")
const {merge} = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
    mode: "production",
    bail: true,
    output: {
        filename: "[contenthash].js"
    }
})
