import store from "../store";
import Node from "~/models/Node";
import { setGraph } from "./index";

export const addNode = (name, weight, x, y) => {
	const state = store.getState();

	const node = new Node({ name, weight, x, y });
	const graph = state.graph.copy();

	graph.insertNode(node);
	store.dispatch(setGraph(graph));
};
