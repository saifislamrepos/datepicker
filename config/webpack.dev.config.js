const merge = require('webpack-merge');
const webpack = require('webpack');

const ManifestPlugin = require('webpack-manifest-plugin');
const HotModuleReplacementPlugin = require("webpack-hot-middleware");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../config/webpack.config.js');

var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path');
var webpackConfig = merge(baseWebpackConfig, {
    output:{
        publicPath : '',
        path : path.resolve(__dirname, '../dist')
    },
    mode : 'development',
    devtool: '#cheap-module-eval-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index_tem.html',
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin()
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
		rules: [{
		  test: /\.css$/,
		  use: [{
		      loader: 'style-loader/url'
		    },
		    {
		      loader: 'file-loader'
		    }
		  ]
		},{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
        plugins: [ 'react-hot-loader/babel',"dynamic-import-webpack","transform-class-properties","@babel/plugin-proposal-object-rest-spread" ]
        }
    }]
		}
});
webpackConfig.entry.push("react-hot-loader/patch")
webpackConfig.entry.push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000")
module.exports = webpackConfig;