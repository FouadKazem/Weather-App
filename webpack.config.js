require('dotenv').config()
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
    mode: NODE_ENV,
    devtool: NODE_ENV == 'development' ? 'source-map' : undefined,
    entry: './src/ui/index.tsx',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist', 'public'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [
                    NODE_ENV == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/ui/index.html',
            filename: 'index.html',
            scriptLoading: 'blocking',
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: NODE_ENV == 'development' ? {
        static: {
            directory: path.join(__dirname, 'dist', 'public')
        },
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: {
            index: 'index.html',
        },
        devMiddleware: {
            writeToDisk: true,
        },
    } : undefined
}
