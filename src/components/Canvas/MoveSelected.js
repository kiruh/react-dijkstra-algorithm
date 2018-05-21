/* eslint-env browser */
import store from "~/store";

import { setGraph } from "~/actions/index";

export default class MoveSelected {
	static move(event, node) {
		MoveSelected.node = node;
		MoveSelected.dragged = true;
		MoveSelected.startPoint = {
			x: event.clientX,
			y: event.clientY,
		};
		document.onmousemove = e => {
			MoveSelected.onMouseMove(e);
		};
		document.onmouseup = () => {
			MoveSelected.onMouseUp();
		};
	}

	static onMouseMove(event) {
		if (MoveSelected.dragged) {
			const state = store.getState();
			const graph = state.graph.copy();

			const node = graph.nodes[MoveSelected.node.name];
			const diffX = event.clientX - MoveSelected.startPoint.x;
			const diffY = event.clientY - MoveSelected.startPoint.y;
			node.move(diffX, diffY);

			MoveSelected.startPoint = {
				x: event.clientX,
				y: event.clientY,
			};

			store.dispatch(setGraph(graph));
		}
	}

	static onMouseUp() {
		document.onmousemove = null;
		document.onmouseup = null;
		MoveSelected.dragged = false;
	}
}
