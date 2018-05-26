import React from "react";

import Graph from "~/models/Graph";
import { changeGraph } from "~/actions/controller";
import { EXAMPLE_GRAPH } from "~/constants";

const LoadExample = () => (
	<button
		className="btn btn-light ml-2"
		title="Load example"
		onClick={() => {
			const graph = Graph.fromJSON(EXAMPLE_GRAPH);
			changeGraph(graph);
		}}
	>
		<i className="fas fa-magic" />
	</button>
);

export default LoadExample;
