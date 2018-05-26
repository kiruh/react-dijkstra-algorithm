import React from "react";

import Graph from "~/models/Graph";
import { changeGraph } from "~/actions/controller";

const ClearGraph = () => (
	<button
		className="btn btn-light ml-2"
		onClick={() => {
			const graph = new Graph();
			changeGraph(graph);
		}}
		title="Clear graph"
	>
		<i className="fas fa-trash" />
	</button>
);

export default ClearGraph;
