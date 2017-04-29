const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: './app.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015', 'es2016']
				}
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					loader: 'css-loader'
				})
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			favicon: 'favicon.png',
			template: 'index.html'
		}),
		new ExtractTextPlugin('app.css')
	]
};