import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { connect } from "react-redux";

import { onLinkClick } from "~/actions/controller";

class LinkDrawing extends React.Component {
	componentDidMount() {
		this.draw();
	}

	componentDidUpdate() {
		this.draw();
	}

	draw() {
		const { link, activeItem } = this.props;
		const { start, end } = link;
		if (this.drawing) {
			this.drawing.remove();
			this.drawing = null;
		}

		const isActive =
			activeItem &&
			activeItem.type === "LINK" &&
			activeItem.start === start.name &&
			activeItem.end === end.name;
		const color = isActive ? "blue" : "green";
		const arrow = isActive ? "arrow-active" : "arrow";

		this.drawing = this.line
			.append("line")
			.attr("x1", start.x)
			.attr("y1", start.y)
			.attr("x2", end.x)
			.attr("y2", end.y)
			.attr("stroke", color)
			.attr("stroke-width", 2)
			.attr("marker-end", `url(#${arrow})`);
	}

	renderClickableLine() {
		const { link } = this.props;
		const { start, end } = link;
		return (
			<line
				onMouseDown={event => {
					onLinkClick(link, event.shiftKey);
					event.stopPropagation();
				}}
				cursor="move"
				stroke="transparent"
				strokeWidth="10px"
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
			/>
		);
	}

	render() {
		return (
			<g
				ref={line => {
					this.line = d3.select(line);
				}}
			>
				{this.renderClickableLine()}
			</g>
		);
	}
}

LinkDrawing.propTypes = {
	link: PropTypes.objectOf(PropTypes.any).isRequired,
	activeItem: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
	activeItem: state.activeItem,
});

export default connect(mapStateToProps, null)(LinkDrawing);
