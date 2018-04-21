const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
	context: __dirname,
	entry: './app.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'env',
							{
								'modules': false
							}
						],
						'react'
					]
				}
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader'
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
		new ExtractTextPlugin('app.css'),
		new WebpackBar()
	]
};