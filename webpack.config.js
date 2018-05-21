const _ = require("lodash");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const ROOT = path.resolve(__dirname);
const isProd = process.env.NODE_ENV === "production";

const config = {
	entry: {
		vector: `./src/index`,
	},
	output: {
		path: path.resolve(ROOT, `./build/assets/`),
		filename: "index.js",
	},
	watchOptions: {
		poll: true,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [
						`css-loader?${isProd ? "&minimize=true" : ""}`,
						"postcss-loader",
					],
					fallback: "style-loader",
				}),
			},
			{
				test: /\.(css|less)$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [
						`css-loader?modules${
							isProd
								? "&localIdentName=[hash:base64]"
								: "&localIdentName=[local]___[hash:base64:5]"
						}${isProd ? "&minimize=true" : ""}`,
						"postcss-loader",
						"less-loader",
					],
					fallback: "style-loader",
				}),
			},
		],
	},
	resolve: {
		alias: {
			"~": path.resolve(ROOT, "src/"),
		},
		extensions: [".js", ".jsx"],
	},
	plugins: [new ExtractTextPlugin("index.css"), new FriendlyErrorsPlugin()],
};

if (isProd) {
	config.plugins.push(
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
			},
		}),
		new webpack.ContextReplacementPlugin(
			// The path to directory which should be handled by this plugin
			/moment[/\\]locale/,
			// A regular expression matching files that should be included
			/en-us.js/,
		),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
		}),
	);
}

module.exports = _.cloneDeep(config);
