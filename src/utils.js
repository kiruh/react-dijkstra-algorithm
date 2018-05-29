/* eslint-disable no-mixed-operators */
import sillyname from "sillyname";

const getMinOrMaxPropertyHelper = (arr, prop, type) => {
	/* IM FCKN GENIUS */
	if (!arr) return undefined;

	return arr.reduce((m, item) => {
		const value = item[prop];

		if (!m) return value;

		if (type === "min" && value < m) return value;
		if (type === "max" && value > m) return value;

		return m;
	}, undefined);
};

export const getMinProperty = (arr, prop) =>
	getMinOrMaxPropertyHelper(arr, prop, "min");

export const getMaxProperty = (arr, prop) =>
	getMinOrMaxPropertyHelper(arr, prop, "max");

export const getEquationOfLineFromTwoPoints = (point1, point2) => {
	const equation = {
		gradient: (point1.y - point2.y) / (point1.x - point2.x),
	};
	let parts;

	equation.yIntercept = point1.y - equation.gradient * point1.x;
	equation.toString = () => {
		if (Math.abs(equation.gradient) === Infinity) {
			return `x = ${point1.x}`;
		}
		parts = [];

		if (equation.gradient !== 0) {
			parts.push(`${equation.gradient}x`);
		}

		if (equation.yIntercept !== 0) {
			parts.push(equation.yIntercept);
		}

		return `y = ${parts.join(" + ")}`;
	};

	return equation;
};

export const floatToFixedIfNeeded = number =>
	number.toFixed(2).replace(/[.,]00$/, "");

export const getFirstSillyName = () =>
	sillyname().split(" ")[Math.round(Math.random())];

export const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const getDistance = (a, b) =>
	Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

export const getExampleGraphJSON = () => {
	// return HARCODED_GRAPH;

	const nodes = [];
	const links = [];

	const usedNames = [];

	for (let i = 0; i < 8; i += 1) {
		for (let j = 0; j < 8; j += 1) {
			let name;
			do {
				name = getFirstSillyName();
			} while (usedNames.includes(name));
			usedNames.push(name);

			const weight = getRandomInt(1, 1000);
			const x = getRandomInt(125 * i + 20, 125 * (i + 1) - 20);
			const y = getRandomInt(125 * j + 20, 125 * (j + 1) - 20);
			const node = { name, weight, x, y };
			nodes.push(node);
		}
	}

	nodes.forEach(node => {
		const destinations = nodes.map(nd => {
			const distance =
				nd.name === node.name ? Infinity : getDistance(node, nd);
			return { name: nd.name, distance };
		});

		destinations.sort((a, b) => a.distance - b.distance);

		destinations.slice(0, 3).forEach(destination => {
			const start = node.name;
			const end = destination.name;
			const length = getRandomInt(1, 1000);

			const link = { start, end, length };
			links.push(link);
		});
	});

	return { nodes, links };
};
