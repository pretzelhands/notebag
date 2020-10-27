"use strict";

const { resolve } = require("path");
const { readdirSync } = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const nodeModules = {};
readdirSync("node_modules").filter(mods => ![".bin", ".cache"].includes(mods)).forEach(mod => nodeModules[mod] = `require("${mod}")`);

module.exports = {
	mode: process.env.NODE_ENV,
	target: "electron-main",
	entry: resolve(__dirname, "src/electron-app/main.js"),
	output: {
		path: resolve(__dirname, "dist/electron-app/")
	},
	externals: nodeModules,
	node: {
		__filename: false,
		__dirname: false
	},
	performance: {
		hints: false
	},
	module: {
		rules: [{
			enforce: "pre",
			test: /\.m?js$/i,
			exclude: /node_modules/,
			loader: "eslint-loader",
			options: {
				configFile: resolve(__dirname, ".eslintrc-electron-app.js"),
				emitError: true,
				emitWarning: true,
				failOnError: true,
				failOnWarning: true
			}
		}, {
			test: /\.m?js$/i,
			loader: "babel-loader",
			options: {
				comments: false,
				minified: true
			}
		}]
	},
	plugins: [
		new CleanWebpackPlugin()
	],
	resolve: {
		extensions: [".js", ".mjs", ".json"],
		alias: {
			"@": resolve(__dirname, "src/electron-app/")
		}
	}
};
