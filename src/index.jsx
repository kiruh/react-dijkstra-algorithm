/* eslint-env browser */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./store";

import "./index.less";
import Graph from "~/models/Graph";
import Node from "~/models/Node";
import DijkstraSearch from "~/models/DijkstraSearch";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("container"),
);

// CONSOLE PROGRAM
const test = () => {
	const graph = new Graph();

	const a = new Node({ name: "1", weight: 100, x: 182, y: 101 });
	const b = new Node({ name: "2", weight: 400, x: 90, y: 313 });
	const c = new Node({ name: "some big string", weight: 600, x: 10, y: 301 });
	const d = new Node({ name: "4", weight: 100, x: 298, y: 20 });
	const e = new Node({
		name: "5",
		weight: 200,
		x: 632,
		y: 23,
	});
	const f = new Node({
		name: "#093jcds, <ja3r9 .sdenf3201 `` wqkj",
		weight: 900,
		x: 10,
		y: 128,
	});

	graph.insertNode(a);
	graph.insertNode(b);
	graph.insertNode(c);
	graph.insertNode(d);
	graph.insertNode(e);
	graph.insertNode(f);

	graph.createTwoWayPath(a, 14, f);
	graph.createTwoWayPath(a, 9, c);
	graph.createTwoWayPath(a, 7, b);

	graph.createTwoWayPath(b, 10, c);
	graph.createTwoWayPath(b, 15, d);

	graph.createTwoWayPath(c, 2, f);
	graph.createTwoWayPath(c, 11, d);

	graph.createTwoWayPath(d, 6, e);

	graph.createTwoWayPath(e, 9, f);

	graph.search("1", "5", DijkstraSearch.BY_LINK_LENGTH);
	// graph.search("1", "5", DijkstraSearch.BY_WEIGHT);
	// graph.search("1", "5", DijkstraSearch.BY_COORDINATES);
};

test();
