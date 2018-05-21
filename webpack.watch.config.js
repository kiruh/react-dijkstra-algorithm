const _ = require("lodash");
const WebpackLivereloadPlugin = require("webpack-livereload-plugin");
const findPort = require("find-port");
const config = require("./webpack.config");

const isProd = process.env.NODE_ENV === "production";

const configAsync = new Promise(resolve => {
	findPort("127.0.0.1", 35729, 35750, ports => {
		if (!isProd) {
			config.plugins.push(
				new WebpackLivereloadPlugin({
					appendScriptTag: true,
					port: ports[0],
				}),
			);
		}
		resolve(_.cloneDeep(config));
	});
});

module.exports = configAsync;
