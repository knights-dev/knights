const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/bootstrap.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.wasm$/,
                type: 'webassembly/async',
            },
        ],
    },
    experiments: {
        asyncWebAssembly: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '../crates/interp-if'),
            outDir: '../../interp-wasm',
        }),
    ],
};
