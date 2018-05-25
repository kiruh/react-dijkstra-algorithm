import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Node from "~/models/Node";
import MoveSelected from "./MoveSelected";
import { onNodeClick } from "~/actions/controller";
import { ACTIVE_COLOR, NODE_COLOR } from "~/constants";

class NodeDrawing extends React.Component {
	onMouseDown(event) {
		const { node } = this.props;
		MoveSelected.move(event, node);
		onNodeClick(node, event.ctrlKey);
		event.stopPropagation();
	}

	getMoveableProps() {
		if (this.props.notClickable) return {};
		return {
			onMouseDown: event => {
				this.onMouseDown(event);
			},
			cursor: "move",
		};
	}

	get color() {
		const { node, activeItem } = this.props;
		if (
			activeItem &&
			activeItem.type === "NODE" &&
			node.name === activeItem.name
		) {
			return ACTIVE_COLOR;
		}
		return this.props.color;
	}

	renderTitle() {
		const { node, showProperties } = this.props;
		if (!showProperties) return null;

		return (
			<text x={node.x + 12} y={node.y + 4} className="small-svg-text">
				{node.toString()}
			</text>
		);
	}

	render() {
		const { node } = this.props;

		return (
			<g>
				<ellipse
					fill={this.color}
					cx={node.x}
					cy={node.y}
					rx="10"
					ry="10"
					{...this.getMoveableProps()}
				>
					<title>{node.toString()}</title>
				</ellipse>
				{this.renderTitle()}
			</g>
		);
	}
}

NodeDrawing.defaultProps = {
	color: NODE_COLOR,
};

NodeDrawing.propTypes = {
	node: PropTypes.instanceOf(Node).isRequired,
	activeItem: PropTypes.objectOf(PropTypes.any),
	showProperties: PropTypes.bool.isRequired,
	color: PropTypes.string.isRequired,
	notClickable: PropTypes.bool,
};

const mapStateToProps = state => ({
	activeItem: state.activeItem,
	showProperties: state.showProperties,
});

export default connect(mapStateToProps, null)(NodeDrawing);
