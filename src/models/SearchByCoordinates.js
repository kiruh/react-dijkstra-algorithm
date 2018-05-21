/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
import ISearch from "./ISearch";

export default class SearchByCoordinates extends ISearch {
	search(start, finish) {
		if (!this.graph.graph[start] || !this.graph.graph[finish]) return false;

		const beginning = this.graph.graph[start];
		const end = this.graph.graph[finish];

		this.x = end.x;
		this.y = end.y;

		const queue = [];
		queue.push(beginning);

		while (queue.length > 0) {
			const temp = queue.shift();
			temp.isTested = true;

			console.log(temp.name);

			if (temp === end) {
				return true;
			}

			temp.paths.forEach(link => {
				if (
					!link.endPoint.isTested &&
					!this.graph.graph[link.endPoint]
				) {
					this.addToQueue(link.endPoint, queue);
				}
			});
		}

		return false;
	}

	addToQueue(endPoint, queue) {
		const distance = Math.sqrt(
			(endPoint.x - this.x) ** 2 + (endPoint.y - this.y) ** 2,
		);

		endPoint.distance = distance;

		for (let i = 0; i < queue.length; i += 1) {
			if (queue[i].distance > distance) {
				queue.splice(i, 0, endPoint);
				return;
			}
		}

		queue.push(endPoint);
	}
}
