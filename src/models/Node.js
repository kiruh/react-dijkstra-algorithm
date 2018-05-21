export default class Node {
	constructor({ name, weight, x, y }) {
		this.name = name;
		this.title = name;
		this.weight = weight || 50;
		this.x = x;
		this.y = y;
		this.paths = [];
	}

	insertPath(path) {
		if (!this.paths.some(p => p.toNodeName === path.toNodeName)) {
			this.paths.push(path);
		}
	}

	removeLink(toNodeName) {
		this.paths = this.paths.filter(link => link.toNodeName !== toNodeName);
	}

	move(diffX, diffY) {
		this.x += diffX;
		this.y += diffY;
	}
}
