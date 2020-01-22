const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/bootstrap.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html")
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "../interp-rs/"),
            outDir: '../editor/interp-wasm'
        }),
    ],
};
