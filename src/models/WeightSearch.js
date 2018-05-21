/* eslint-disable class-methods-use-this */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
import ISearch from "./ISearch";

export default class WeightSearch extends ISearch {
	search(start, finish) {
		if (!this.graph.graph[start] || !this.graph.graph[finish]) return false;

		const first = this.graph.graph[start];

		const queue = [];
		queue.push(first);

		while (queue.length > 0) {
			const current = queue.shift();
			current.isTested = true;

			console.log(`${current.name}-`);

			if (current.name === finish) return true;

			for (let i = 0; i < current.paths.length; i += 1) {
				const link = current.paths[i];

				if (queue.includes(link.endPoint) || link.endPoint.isTested) {
					continue;
				}

				this.addToQueue(link.endPoint, queue);
			}
		}

		return false;
	}

	addToQueue(nodeToAdd, queue) {
		for (let i = 0; i < queue.length; i += 1) {
			if (nodeToAdd.weight < queue[i].weight) {
				queue.splice(i, 0, nodeToAdd);
				return;
			}
		}

		queue.push(nodeToAdd);
	}
}
