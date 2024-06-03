const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devServer: {
        compress: true,
        port: 9000,
        static: path.join(__dirname, 'dist'),
    },
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/,
            },
            {
                exclude: /node_modules/,
                use: 'ts-loader',
                test: /\.ts$/,
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
