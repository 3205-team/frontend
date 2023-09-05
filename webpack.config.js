const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: './src/index.tsx',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader", 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@app': path.resolve(__dirname, 'src'),
        },
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html"}),
        new MiniCssExtractPlugin({
            filename: "common.css",
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8080
    }
}