import _ from "lodash";
import Link from "./Link";
import DijkstraSearch from "./DijkstraSearch";

export default class Graph {
	constructor() {
		this.nodes = {};
	}

	search(start, end, distanceType) {
		const path = DijkstraSearch.search(start, end, this, distanceType);
		if (path) {
			console.log("Path found!", path);
		} else {
			console.log("No path found!");
		}
	}

	copy() {
		return _.cloneDeep(this);
	}

	insertNode(node) {
		this.nodes = {
			...this.nodes,
			[node.name]: node,
		};
	}

	createPath(from, length, to) {
		if (!this.nodes[from.name] || !this.nodes[to.name]) {
			console.error("Nodes are not part of the graph!");
			return;
		}
		const path = new Link({ length, to });
		from.insertPath(path);
	}

	createTwoWayPath(from, length, to) {
		this.createPath(from, length, to);
		this.createPath(to, length, from);
	}
}
