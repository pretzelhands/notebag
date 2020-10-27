"use strict";

const { resolve } = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV,
	target: "electron-renderer",
	entry: resolve(__dirname, "src/vue-app/main.js"),
	output: {
		path: resolve(__dirname, "dist/vue-app/"),
//		target: "/",
		filename: "javascript/[name].[hash:8].js",
		chunkFilename: "javascript/[id].[chunkhash:8].js"
	},
	node: {
		__filename: true,
		__dirname: true
	},
	devServer: {
		historyApiFallback: true,
		overlay: {
			errors: true,
			warnings: true
		}
	},
	performance: {
		hints: false
	},
	module: {
		rules: [{
			enforce: "pre",
			test: /\.(vue|m?js)$/i,
			exclude: /(node_modules|bower_components)/,
			loader: "eslint-loader",
			options: {
				configFile: resolve(__dirname, ".eslintrc-vue-app.js"),
				emitError: true,
				emitWarning: true,
				failOnError: true,
				failOnWarning: true
			}
		}, {
			test: /\.vue$/i,
			loader: "vue-loader"
		}, {
			test: /\.m?js$/i,
			loader: "babel-loader",
			exclude: /(node_modules|bower_components)/,
			options: {
				comments: false,
				minified: true
			}
		}, {
			test: /\.css$/i,
			use: [
				"vue-style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 1
						// 0 => no loaders (default);
						// 1 => postcss-loader;
					}
				},
				"postcss-loader"
			]
		}, {
			test: /\.scss$/i,
			use: [
				"vue-style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 2
						// 0 => no loaders (default);
						// 1 => postcss-loader;
						// 2 => postcss-loader, sass-loader
					}
				},
				"postcss-loader",
				{
					loader: "sass-loader",
					options: {
						sassOptions: {
							outputStyle: "compressed"
						},
						prependData: '@import "@/assets/scss/_variables.scss";'
					}
				}
			]
		}, {
			test: /\.sass$/i,
			use: [
				"vue-style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 2
						// 0 => no loaders (default);
						// 1 => postcss-loader;
						// 2 => postcss-loader, sass-loader
					}
				},
				"postcss-loader",
				{
					loader: "sass-loader",
					options: {
						sassOptions: {
							indentedSyntax: true,
							outputStyle: "compressed"
						}
					}
				}
			]
		}, {
			test: /\.svg(\?.*)?$/i,
			use: [{
				loader: "file-loader",
				options: {
					name: "images/[name].[ext]",
					esModule: false
				}
			}, {
				loader: "svgo-loader",
				options: {
					plugins: [{
						removeViewBox: false
					}]
				}
			}]
		}, {
			test: /\.(png|jpe?g|gif|ico)(\?.*)?$/i,
			loader: "file-loader",
			options: {
				name: "images/[name].[hash:8].[ext]",
				esModule: false
			}
		}, {
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
			loader: "file-loader",
			options: {
				name: "media/[name].[hash:8].[ext]",
				esModule: false
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
			loader: "file-loader",
			options: {
				name:"fonts/[name].[hash:8].[ext]",
				esModule: false
			}
		}]
	},
	plugins: [
		new VueLoaderPlugin(),
		// new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: resolve("src/vue-app/index.html"),
			inject: true,
			minify: {
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				html5: true,
				keepClosingSlash: true,
				removeComments: true
			},
			xhtml: true
		})
	],
	resolve: {
		extensions: [".vue", ".js", "mjs", ".json"],
		alias: {
			"vue$": "vue/dist/vue.esm.js",
			"@": resolve(__dirname, "src/vue-app/")
		}
	}
};
