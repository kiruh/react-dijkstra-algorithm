export default class DijkstraSearch {
	static get BY_LINK_LENGTH() {
		return "BY_LINK_LENGTH";
	}

	static get BY_WEIGHT() {
		return "BY_WEIGHT";
	}

	static get BY_COORDINATES() {
		return "BY_COORDINATES";
	}

	static search(start, finish, graph, distanceType) {
		if (!graph.nodes[start] || !graph.nodes[finish]) {
			console.error("Nodes are not part of the graph!");
			return null;
		}

		const beginning = graph.nodes[start];

		const queue = [];
		queue.push(beginning);

		const tested = [];
		const distances = Object.keys(graph.nodes).reduce(
			(reduced, name) => ({ ...reduced, [name]: { dist: Infinity } }),
			{},
		);
		distances[start] = { dist: 0 };

		while (queue.length > 0) {
			queue.sort(
				(a, b) => distances[a.name].dist - distances[b.name].dist,
			);

			const current = queue.shift();

			tested.push(current);

			for (let i = 0; i < current.paths.length; i += 1) {
				const link = current.paths[i];
				if (link.endPoint.name === finish) {
					const path = [link.endPoint];
					let last = current;
					while (last.name !== start) {
						path.unshift(last);
						last = distances[last.name].prev;
					}
					path.unshift(beginning);
					return path;
				}

				if (!tested.includes(link.endPoint)) {
					const currentDistance = distances[current.name].dist;
					const newDistance =
						currentDistance +
						DijkstraSearch.getDistance(current, link, distanceType);

					if (distances[link.endPoint.name].dist > newDistance) {
						distances[link.endPoint.name] = {
							prev: current,
							dist: newDistance,
						};
					}

					const index = queue.indexOf(link.endPoint);
					if (index !== -1) {
						queue[index] = link.endPoint;
					} else {
						queue.push(link.endPoint);
					}
				}
			}
		}

		return null;
	}

	static getDistance(node, link, distanceType) {
		if (distanceType === DijkstraSearch.BY_LINK_LENGTH) {
			return link.length;
		}

		if (distanceType === DijkstraSearch.BY_COORDINATES) {
			const a = node;
			const b = link.endPoint;
			/* eslint-disable no-mixed-operators */
			return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
			/* eslint-enable */
		}

		if (distanceType === DijkstraSearch.BY_WEIGHT) {
			return link.endPoint.weight;
		}

		return 0;
	}
}
