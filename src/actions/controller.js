import store from "../store";
import { setGraph, setActiveItem } from "./index";

export const addNode = node => {
	const state = store.getState();
	const graph = state.graph.copy();

	graph.insertNode(node);
	store.dispatch(setGraph(graph));
};

export const onNodeClick = (node, ctrl = false, shift = false) => {
	const state = store.getState();
	if (shift) {
		const graph = state.graph.copy();
		graph.removeNode(node);
		store.dispatch(setGraph(graph));
		return;
	}
	if (
		ctrl &&
		state.activeItem &&
		state.activeItem.type === "NODE" &&
		node.name !== state.activeItem.name
	) {
		const graph = state.graph.copy();
		graph.createPath(state.activeItem, 100, node);

		store.dispatch(setActiveItem(null));
		store.dispatch(setGraph(graph));
		return;
	}
	store.dispatch(
		setActiveItem({
			type: "NODE",
			name: node.name,
		}),
	);
};

export const onLinkClick = (link, shift) => {
	if (shift) {
		const state = store.getState();
		const graph = state.graph.copy();

		const { start, end } = link;
		const node = graph.nodes[start.name];
		node.removeLink(end.name);

		store.dispatch(setGraph(graph));
		return;
	}
	store.dispatch(
		setActiveItem({
			type: "LINK",
			start: link.start.name,
			end: link.end.name,
		}),
	);
};

export const changeGraph = graph => {
	store.dispatch(setGraph(graph));
};
