/* eslint-disable no-mixed-operators */
import React from "react";
import algebra from "algebra.js";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { connect } from "react-redux";

import { onLinkClick } from "~/actions/controller";
import { getEquationOfLineFromTwoPoints } from "~/utils";
import { ACTIVE_COLOR, LINK_COLOR } from "~/constants";

class LinkDrawing extends React.Component {
	componentDidMount() {
		this.draw();
	}

	componentDidUpdate() {
		this.draw();
	}

	get isActive() {
		const { link, activeItem } = this.props;
		const { start, end } = link;
		return (
			activeItem &&
			activeItem.type === "LINK" &&
			activeItem.start === start.name &&
			activeItem.end === end.name
		);
	}

	get color() {
		return this.isActive ? ACTIVE_COLOR : LINK_COLOR;
	}

	get arrow() {
		return this.isActive ? "arrow-active" : "arrow";
	}

	draw() {
		const { link } = this.props;
		const { start, end } = link;
		if (this.drawing) {
			this.drawing.remove();
			this.drawing = null;
		}

		this.drawing = this.line
			.append("line")
			.attr("x1", start.x)
			.attr("y1", start.y)
			.attr("x2", end.x)
			.attr("y2", end.y)
			.attr("stroke", this.color)
			.attr("stroke-width", 2)
			.attr("marker-end", `url(#${this.arrow})`);
	}

	renderClickableLine() {
		const { link } = this.props;
		const { start, end } = link;
		return (
			<line
				onMouseDown={event => {
					onLinkClick(link);
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

	renderCircle() {
		const { link } = this.props;
		const { start, end } = link;
		const { gradient } = getEquationOfLineFromTwoPoints(start, end);

		const cx = end.x - (end.x - start.x) / 2;
		const cy = end.y - (end.y - start.y) / 2;

		const renderCircle = (x, y) => (
			<ellipse
				onMouseDown={event => {
					onLinkClick(link);
					event.stopPropagation();
				}}
				cursor="move"
				fill={this.color}
				cx={x}
				cy={y}
				rx="3px"
				ry="3px"
			/>
		);

		if (start.y === end.y) {
			const x = cx;
			const y = start.x > end.x ? cy - 10 : cy + 10;
			return renderCircle(x, y);
		}

		const k1 = gradient;
		const b2 = cx / k1 + cy;
		const k2 = -1 / k1;

		const eq1 = `((x - (${cx}))^2 + ((${k2}) * x + (${b2}) - (${cy}))^2)^0.5 - 100`;
		const expr = algebra.parse(eq1);
		try {
			const eq = new algebra.Equation(expr, 0);

			const solution = eq.solveFor("x");
			const x = start.x > end.x ? solution[0] : solution[1];
			const y = k2 * x + b2;

			return renderCircle(x, y);
		} catch (error) {
			// DO NOTHING
		}
		return null;
	}

	render() {
		return (
			<g
				ref={line => {
					this.line = d3.select(line);
				}}
			>
				{this.renderClickableLine()}
				{this.renderCircle()}
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
