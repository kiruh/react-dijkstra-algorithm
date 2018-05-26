import store from "../store";
import { setGraph, setActiveItem, setAnswers } from "./index";

export const addNode = node => {
	const state = store.getState();
	const graph = state.graph.copy();

	graph.insertNode(node);
	store.dispatch(setGraph(graph));
};

export const onNodeClick = (node, ctrl = false, delPressed = false) => {
	const state = store.getState();
	if (delPressed) {
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

export const onLinkClick = (link, delPressed = false) => {
	if (delPressed) {
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

export const clearAnswers = () => {
	store.dispatch(setAnswers(null));
};

export const changeGraph = graph => {
	clearAnswers();
	store.dispatch(setGraph(graph));
};

export const searchGraph = (selectedNodes = []) => {
	const state = store.getState();
	const { graph, distanceType } = state;

	if (selectedNodes.length <= 1) return;

	const answers = selectedNodes.slice(1).map((node, index) => {
		const prev = selectedNodes[index];
		const a = graph.search(prev.name, node.name, distanceType);
		return a;
	});

	store.dispatch(setActiveItem(null));
	store.dispatch(setAnswers(answers));
};

export const udpateAnswers = selectedNodes => {
	const state = store.getState();
	const { answers } = state;

	if (answers && selectedNodes.length > 1) searchGraph(selectedNodes);
	else clearAnswers();
};
