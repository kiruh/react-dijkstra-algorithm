import { floatToFixedIfNeeded } from "~/utils";

export default class Node {
	constructor({ name, weight, x, y }) {
		this.name = name;
		this.weight = weight || 50;
		this.x = x;
		this.y = y;
		this.paths = [];
	}

	insertPath(path) {
		if (this.paths.some(p => p.toNodeName === path.toNodeName)) return;
		if (this.name === path.toNodeName) return;

		this.paths.push(path);
	}

	removeLink(toNodeName) {
		this.paths = this.paths.filter(link => link.toNodeName !== toNodeName);
	}

	move(diffX, diffY) {
		this.x += diffX;
		this.y += diffY;
	}

	toString() {
		const x = floatToFixedIfNeeded(this.x);
		const y = floatToFixedIfNeeded(this.y);
		const weight = floatToFixedIfNeeded(this.weight);
		return `${this.name} (${x}, ${y}) ${weight} u.`;
	}

	toJSON() {
		return {
			name: this.name,
			weight: this.weight,
			x: this.x,
			y: this.y,
		};
	}
}
