"use strict";

const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
	syntax: "postcss-scss",
	plugins: [
		purgecss({
			content: ["src/vue-app/index.html", "src/vue-app/**/*.js", "src/vue-app/**/*.vue"],
			keyframes: true,
			fontFace: true
		})
	]
};
