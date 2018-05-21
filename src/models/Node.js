export default class Node {
	constructor({ name, weight, x, y }) {
		this.name = name;
		this.weight = weight;
		this.x = x;
		this.y = y;
		this.paths = [];
	}

	insertPath(path) {
		this.paths.push(path);
	}
}
