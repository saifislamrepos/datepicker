const merge = require('webpack-merge');
const webpack = require('webpack');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../config/webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path');
var webpackConfig = merge(baseWebpackConfig, {
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].js'
    },
    mode: 'production',
    optimization: {
        minimize: true
    },
    plugins: [
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index_tem.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "assets/css/[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../dist/css/assets'
                    },

                },
                {
                    loader: 'css-loader'
                }

            ]
        }]
    }
});
module.exports = webpackConfig;