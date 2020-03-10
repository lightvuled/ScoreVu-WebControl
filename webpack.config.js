const path = require("path");

module.exports = {
	entry: "./src/index.js",
	mode: "production",
	output: {
		filename: "scorevu.min.js",
		path: path.resolve(__dirname, "dist/js"),
	},
	module: {
		rules: [
		{
			test: /\.(png|jpg|gif|svg)$/,
			use: [
			],
		},
		],
	},
};
