const express = require('express');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackhotmodulereplacement = require("webpack-hot-middleware");
var proxyMiddleware = require('http-proxy-middleware')
const app = express();
config.output.publicPath = '/';
var compiler = webpack(config);
var devmiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000
	}
});
var hotreload = webpackhotmodulereplacement(compiler);
app.use(devmiddleware);
app.use(hotreload);


app.listen(3002, function () {
	console.log('app listening on port 3002!\n');
});
