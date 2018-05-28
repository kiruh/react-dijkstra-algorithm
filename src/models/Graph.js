import _ from "lodash";
import Link from "./Link";
import DijkstraSearch from "./DijkstraSearch";
import { getMinProperty, getMaxProperty } from "~/utils";
import Node from "./Node";

export default class Graph {
	constructor() {
		this.nodes = {};
	}

	get linkArray() {
		return this.nodeArray.reduce((links, node) => {
			const nodeLinks = node.paths.reduce((nls, link) => {
				const end = this.nodes[link.toNodeName];
				// if (!end) return nls;
				return [
					...nls,
					{
						start: node,
						length: link.length,
						end,
					},
				];
			}, []);
			return [...links, ...nodeLinks];
		}, []);
	}

	get nodeArray() {
		return Object.values(this.nodes);
	}

	get minX() {
		return getMinProperty(this.nodeArray, "x");
	}

	get minY() {
		return getMinProperty(this.nodeArray, "y");
	}

	get maxX() {
		return getMaxProperty(this.nodeArray, "x");
	}

	get maxY() {
		return getMaxProperty(this.nodeArray, "y");
	}

	search(start, end, distanceType) {
		const path = DijkstraSearch.search(start, end, this, distanceType);
		return {
			start,
			end,
			path,
		};
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

	removeNode(node) {
		const nodes = this.nodeArray;
		for (let i = 0; i < nodes.length; i += 1) {
			const nd = nodes[i];
			nd.paths = nd.paths.filter(path => path.toNodeName !== node.name);
		}

		delete this.nodes[node.name];
	}

	createPath(from, length, to) {
		if (!this.nodes[from.name] || !this.nodes[to.name]) {
			console.error("Nodes are not part of the graph!");
			return;
		}

		const path = new Link({ length, to: to.name });
		this.nodes[from.name].insertPath(path);
	}

	createTwoWayPath(from, length, to) {
		this.createPath(from, length, to);
		this.createPath(to, length, from);
	}

	changeNodeName(node, newName) {
		const { name } = node;
		const nodes = this.nodeArray;

		for (let i = 0; i < nodes.length; i += 1) {
			const nd = nodes[i];

			for (let j = 0; j < nd.paths.length; j += 1) {
				const path = nd.paths[j];

				if (path.toNodeName === name) {
					path.toNodeName = newName;
				}
			}
		}

		this.nodes[newName] = this.nodes[name];
		this.nodes[newName].name = newName;
		delete this.nodes[name];
	}

	toJSON() {
		const nodes = this.nodeArray.map(node => node.toJSON());
		const links = this.linkArray.map(link => ({
			start: link.start.name,
			length: link.length,
			end: link.end.name,
		}));
		return {
			nodes,
			links,
		};
	}

	static fromJSON({ nodes, links }) {
		const graph = new Graph();

		nodes.forEach(nd => {
			const { name } = nd;

			const weight = Number(nd.weight);
			const x = Number(nd.x);
			const y = Number(nd.y);

			if (!name || isNaN(weight) || isNaN(x) || isNaN(y)) {
				console.warn("Invalid node, skipped.", nd);
				return;
			}
			const node = new Node({
				name,
				weight,
				x,
				y,
			});
			graph.insertNode(node);
		});

		links.forEach(link => {
			const { start, end } = link;
			const length = Number(link.length);

			if (!start || !end || isNaN(length)) {
				console.warn("Invalid link, skipped.", link);
				return;
			}

			const from = graph.nodes[start];
			const to = graph.nodes[end];
			if (!from || !to) {
				console.warn("Invalid link, skipped.", link);
				return;
			}

			graph.createPath(from, length, to);
		});

		return graph;
	}
}
