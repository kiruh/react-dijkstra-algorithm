const config = {
	kill: "pm2 stop graphes;",
	host: "pm2 stop graphes -s; pm2 start build/host.js --name graphes",
	app: "electron build/main.js",
	lint: "eslint src --ext .js,.jsx",
	_watch: "webpack --config watch.js --progress --hide-modules --watch",
	watch: "nps host && nps _watch",
	_build:
		"rimraf build/assets && cross-env NODE_ENV=production webpack --progress --hide-modules",
	build: "nps host && nps _build",
	prettify: `prettier --config .prettierrc --write "src/**/*"`,
};

module.exports = {
	scripts: config,
};
