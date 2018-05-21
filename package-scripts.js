const config = {
	kill: "pm2 stop graphes;",
	host: "pm2 stop graphes -s; pm2 start build/host.js --name graphes",
	app: "electron build/main.js",
	lint: "eslint src --ext .js,.jsx",
	watch:
		"webpack --config webpack.watch.config.js --progress --hide-modules --watch",
	build:
		"rimraf build/assets && cross-env NODE_ENV=production webpack --progress --hide-modules",
	prettify: `prettier --config .prettierrc --write "src/**/*"`,
};

module.exports = {
	scripts: config,
};
