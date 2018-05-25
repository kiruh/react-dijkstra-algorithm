import Graph from "~/models/Graph";
import Node from "~/models/Node";
import DijkstraSearch from "~/models/DijkstraSearch";
import {
	SET_GRAPH,
	SET_DISTANCE_TYPE,
	SET_FINISH,
	SET_START,
	SET_ACTIVE_ITEM,
	SET_SHOW_LINK_DOTS,
	SET_SHOW_PROPERTIES,
	SET_SELECTED_NODES,
	SET_ANSWERS,
} from "~/actions/types";

export const ONE_FIELD_SETTERS = {
	[SET_GRAPH]: "graph",
	[SET_DISTANCE_TYPE]: "distanceType",
	[SET_START]: "start",
	[SET_FINISH]: "finish",
	[SET_ACTIVE_ITEM]: "activeItem",
	[SET_SHOW_LINK_DOTS]: "showLinkDots",
	[SET_SHOW_PROPERTIES]: "showProperties",
	[SET_SELECTED_NODES]: "selectedNodes",
	[SET_ANSWERS]: "answers",
};

export const getInitialState = () => {
	const graph = new Graph();

	const a = new Node({
		name: "Nickelknife Sting",
		weight: 50,
		x: 55.5,
		y: 82,
	});
	const b = new Node({
		name: "Wildbison Loon",
		weight: 50,
		x: 190.5,
		y: 128,
	});
	const c = new Node({
		name: "Fankoala Head",
		weight: 50,
		x: 216.5,
		y: 229,
	});
	const d = new Node({
		name: "Micaeye Scourge",
		weight: 50,
		x: 188.5,
		y: 449,
	});
	const e = new Node({
		name: "Sheergrabber Song",
		weight: 50,
		x: 362.84375,
		y: 194,
	});
	const f = new Node({
		name: "Lakethroat Shift",
		weight: 50,
		x: 68.5,
		y: 291,
	});

	graph.insertNode(a);
	graph.insertNode(b);
	graph.insertNode(c);
	graph.insertNode(d);
	graph.insertNode(e);
	graph.insertNode(f);

	graph.createTwoWayPath(a, 9, b);
	graph.createTwoWayPath(b, 9, c);
	graph.createTwoWayPath(f, 9, b);
	graph.createTwoWayPath(f, 9, d);
	graph.createTwoWayPath(d, 9, c);
	graph.createTwoWayPath(e, 9, c);

	return {
		graph,
		distanceType: DijkstraSearch.BY_LINK_LENGTH,
		start: null,
		finish: null,
		showLinkDots: true,
		showProperties: false,
		activeItem: {
			type: "LINK",
			start: "Lakethroat Shift",
			end: "Wildbison Loon",
		},
		selectedNodes: [e, f],
		answers: [],
	};
};
