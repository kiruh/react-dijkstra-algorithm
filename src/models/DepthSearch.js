import ISearch from "./ISearch";

export default class DepthSearch extends ISearch {
	search(start, finish) {
		if (!this.graph.graph[start] || !this.graph.graph[finish]) return false;

		const queue = [];
		queue.push(this.graph.graph[start]);

		while (queue.length > 0) {
			const current = queue.shift();
			console.log(current.name);

			if (current.name === finish) return true;
			current.isTested = true;

			for (let i = 0; i < current.paths.length; i += 1) {
				const link = current.paths[i];

				if (!link.endPoint.isTested && !queue.includes(link.endPoint)) {
					queue.splice(0, 0, link.endPoint);
				}
			}
		}

		return false;
	}
}
