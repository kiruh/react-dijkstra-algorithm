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
		const end = graph.nodes[finish];

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
				const endPoint = graph.nodes[link.toNodeName];

				// if (endPoint.name === finish) {
				// 	const path = [endPoint];
				// 	let last = current;
				// 	while (last.name !== start) {
				// 		path.unshift(last);
				// 		last = distances[last.name].prev;
				// 	}
				// 	path.unshift(beginning);
				// 	return path;
				// }

				if (!tested.includes(endPoint)) {
					const currentDistance = distances[current.name].dist;
					const newDistance =
						currentDistance +
						DijkstraSearch.getDistance(
							current,
							link,
							endPoint,
							distanceType,
						);

					if (distances[endPoint.name].dist > newDistance) {
						distances[endPoint.name] = {
							prev: current,
							dist: newDistance,
						};
					}

					const index = queue.indexOf(endPoint);
					if (index !== -1) {
						queue[index] = endPoint;
					} else {
						queue.push(endPoint);
					}
				}
			}
		}

		if (distances[finish].dist !== Infinity) {
			const path = [end];
			let last = end;
			while (last.name !== start) {
				path.unshift(last);
				last = distances[last.name].prev;
			}
			path.unshift(beginning);
			return path;
		}

		return null;
	}

	static getDistance(node, link, endPoint, distanceType) {
		if (distanceType === DijkstraSearch.BY_LINK_LENGTH) {
			return link.length;
		}

		if (distanceType === DijkstraSearch.BY_COORDINATES) {
			const a = node;
			const b = endPoint;
			/* eslint-disable no-mixed-operators */
			return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
			/* eslint-enable */
		}

		if (distanceType === DijkstraSearch.BY_WEIGHT) {
			return endPoint.weight;
		}

		return 0;
	}
}
