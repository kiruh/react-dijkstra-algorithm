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

export const getExampleGraphJSON = () => {
	const NODES_LENGTH = 20;
	const LINKS_LENGTH = 20;

	const nodes = [];
	const links = [];

	for (let i = 0; i < NODES_LENGTH; i += 1) {
		const name = getFirstSillyName();
		const weight = getRandomInt(1, 1000);
		const x = getRandomInt(25 * i, 25 * (i + 1));
		const y = getRandomInt(0, 500);
		const node = { name, weight, x, y };
		nodes.push(node);
	}

	for (let i = 0; i < LINKS_LENGTH; i += 1) {
		const startIndex = getRandomInt(0, NODES_LENGTH - 1);
		let endIndex = true;
		do {
			endIndex = getRandomInt(0, NODES_LENGTH - 1);
		} while (endIndex === startIndex);

		const start = nodes[startIndex].name;
		const end = nodes[endIndex].name;
		const length = getRandomInt(1, 1000);

		const link = { start, end, length };
		links.push(link);
	}

	return { nodes, links };
};
