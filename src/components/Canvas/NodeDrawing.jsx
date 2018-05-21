import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Node from "~/models/Node";
import MoveSelected from "./MoveSelected";
import { onNodeClick } from "~/actions/controller";

class NodeDrawing extends React.Component {
	onMouseDown(event) {
		const { node } = this.props;
		MoveSelected.move(event, node);
		onNodeClick(node, event.ctrlKey, event.shiftKey);
		event.stopPropagation();
	}

	getFillColor() {
		const { node, activeItem } = this.props;
		if (
			activeItem &&
			activeItem.type === "NODE" &&
			node.name === activeItem.name
		) {
			return "blue";
		}
		return "black";
	}

	render() {
		const { node } = this.props;
		return (
			<ellipse
				fill={this.getFillColor()}
				cx={node.x}
				cy={node.y}
				rx="10"
				ry="10"
				cursor="move"
				onMouseDown={event => {
					this.onMouseDown(event);
				}}
			>
				<title>
					{node.name} ( {node.x}, {node.y} );
					&nbsp;&nbsp;&nbsp;weight: {node.weight};
				</title>
			</ellipse>
		);
	}
}

NodeDrawing.propTypes = {
	node: PropTypes.instanceOf(Node).isRequired,
	activeItem: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
	activeItem: state.activeItem,
});

export default connect(mapStateToProps, null)(NodeDrawing);
