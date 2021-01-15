const path = require("path")
const config = require("./config")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const htmlPluginOptions = {
    title: process.env.npm_package_name,
    meta: {
        charset: "UTF-8"
    },
    templateParameters: {
        rootID: config.rootID,
    },
    template: path.resolve(config.rootPath, config.publicDir, 'index.ejs'),
    favicon: path.resolve(config.rootPath, config.publicDir, 'favicon.svg'),
}

const TypeScriptRules = {
    test: /\.(ts|tsx)$/,
    use: {
        loader: 'ts-loader',
        options: {
            logInfoToStdOut: true,
        }
    },
    include: [
        path.resolve(config.rootPath, 'src'),
    ],
}

module.exports = {
    entry: path.resolve(config.rootPath, 'src/index.ts'),
    output: {
        path: path.resolve(config.rootPath, config.outputDir),
    },
    resolve: {
        alias: {
            "@": path.resolve(config.rootPath, 'src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            TypeScriptRules,
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(htmlPluginOptions),
    ],
}
