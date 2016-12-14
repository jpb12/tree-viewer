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
				query: {
					presets: ['react', 'es2015', 'es2016']
				}
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader')
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
		}),
		new HtmlWebpackPlugin({
			hash: true,
			favicon: 'favicon.png',
			template: 'index.html'
		}),
		new ExtractTextPlugin('app.css')
	]
};