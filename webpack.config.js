const path = require('path');
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const WebpackBar = require('webpackbar');

module.exports = {
	context: __dirname,
	entry: './app.js',
	output: {
		path: path.join(__dirname, 'docs'),
		filename: 'app.js'
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
			new CSSMinimizerPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			favicon: 'favicon.png',
			template: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'app.css'
		}),
		new WebpackBar()
	]
};