import Graph from "~/models/Graph";
import DijkstraSearch from "~/models/DijkstraSearch";
import {
	SET_GRAPH,
	SET_DISTANCE_TYPE,
	SET_FINISH,
	SET_START,
} from "~/actions/types";

export const ONE_FIELD_SETTERS = {
	[SET_GRAPH]: "graph",
	[SET_DISTANCE_TYPE]: "distanceType",
	[SET_START]: "start",
	[SET_FINISH]: "finish",
};

export const getInitialState = () => ({
	graph: new Graph(),
	distanceType: DijkstraSearch.BY_LINK_LENGTH,
	start: null,
	finish: null,
});
