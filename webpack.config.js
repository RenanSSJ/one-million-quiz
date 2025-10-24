const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/js/index.js'),
        question: path.resolve(__dirname, 'src/js/questions.js'),
        winner: path.resolve(__dirname, 'src/js/winner.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        clean: true,
    },
    devServer: {
        port: 3000,
        open: true,
        liveReload: true,
        static: false,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/question/, to: '/question/index.html' },
                { from: /^\/winner/, to: '/winner/index.html' },
            ],
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/question/index.html',
            filename: 'question/index.html',
            chunks: ['question'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/winner/index.html',
            filename: 'winner/index.html',
            chunks: ['winner'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/images'), to: 'images' },
                { from: path.resolve(__dirname, 'src/data'), to: 'data' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
