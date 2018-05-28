/* eslint-disable no-mixed-operators */
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
		const nodesProps = Object.keys(graph.nodes).reduce(
			(reduced, name) => ({
				...reduced,
				[name]: { distanceFromStart: Infinity },
			}),
			{},
		);
		nodesProps[start] = { distanceFromStart: 0 };

		while (queue.length > 0) {
			queue.sort(
				(a, b) =>
					nodesProps[a.name].distanceFromStart -
					nodesProps[b.name].distanceFromStart,
			);

			const current = queue.shift();
			tested.push(current);

			current.paths.forEach(link => {
				const endPoint = graph.nodes[link.toNodeName];
				if (tested.includes(endPoint)) return;

				const currentDistance =
					nodesProps[current.name].distanceFromStart;
				const newDistance =
					currentDistance +
					DijkstraSearch.getDistance(
						current,
						link,
						endPoint,
						distanceType,
					);

				if (nodesProps[endPoint.name].distanceFromStart > newDistance) {
					nodesProps[endPoint.name] = {
						prev: current,
						distanceFromStart: newDistance,
					};
				}

				const index = queue.indexOf(endPoint);
				if (index !== -1) {
					queue[index] = endPoint;
				} else {
					queue.push(endPoint);
				}
			});
		}

		if (nodesProps[finish].distanceFromStart !== Infinity) {
			const path = [end];
			let last = end;
			while (last.name !== start) {
				path.unshift(last);
				last = nodesProps[last.name].prev;
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
			return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
		}

		if (distanceType === DijkstraSearch.BY_WEIGHT) {
			return endPoint.weight;
		}

		return 0;
	}
}
