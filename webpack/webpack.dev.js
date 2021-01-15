const path = require("path")
const config = require("./config")
const {merge} = require("webpack-merge")
const common = require("./webpack.common")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const styleRules = {
    test: /\.scss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                modules: {}
            }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: {
                    localIdentName: "[local]-[contenthash:5]",
                },
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                implementation: require("sass")
            }
        }
    ]
}

const webpackDevConfig = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        filename: "[name]-[contenthash:5].js"
    },
    performance: {
        hints: 'warning',
    },
    devServer: {
        port: 9000,
        noInfo: true,
        overlay: true,
        compress: true,
        watchContentBase: true,
        contentBase: path.resolve(config.rootPath, config.publicDir)
    },
    module: {
        rules: [
            styleRules
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: '[name]-[contenthash:5].css',
        }),
    ],
})

module.exports = webpackDevConfig
