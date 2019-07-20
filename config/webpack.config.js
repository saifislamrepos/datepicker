const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
module.exports = {
	entry: ['./src/index.js'],
	output: {
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.json','.css'],
		alias: {
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'es2015',
					  'react'
					],
					plugins: [ "transform-class-properties","transform-object-rest-spread" ]
				  }
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.styl(us)?$/,
				use: [ 'css-loader', 'stylus-loader','sass-loader']
			}
		]
	}
};