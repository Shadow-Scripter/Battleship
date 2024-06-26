const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'BattleShip',
            filename: 'index.html',
            template: './src/template.html',
            favicon: "./src/assets/cruise.png",
        }),
    ]
}