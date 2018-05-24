/* eslint-disable no-mixed-operators */
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
