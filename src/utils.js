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
