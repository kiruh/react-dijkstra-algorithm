import Graph from "~/models/Graph";
import DijkstraSearch from "~/models/DijkstraSearch";
import {
	SET_GRAPH,
	SET_DISTANCE_TYPE,
	SET_ACTIVE_ITEM,
	SET_SHOW_LINK_DOTS,
	SET_SHOW_PROPERTIES,
	SET_ANSWERS,
} from "~/actions/types";

export const ONE_FIELD_SETTERS = {
	[SET_GRAPH]: "graph",
	[SET_DISTANCE_TYPE]: "distanceType",
	[SET_ACTIVE_ITEM]: "activeItem",
	[SET_SHOW_LINK_DOTS]: "showLinkDots",
	[SET_SHOW_PROPERTIES]: "showProperties",
	[SET_ANSWERS]: "answers",
};

export const getInitialState = () => ({
	graph: new Graph(),
	distanceType: DijkstraSearch.BY_COORDINATES,
	showLinkDots: true,
	showProperties: false,
	activeItem: null,
	answers: null,
});
