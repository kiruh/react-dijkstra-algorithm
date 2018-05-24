import React from "react";
import PropTypes from "prop-types";
import sillyName from "sillyname";
import { connect } from "react-redux";

import Graph from "~/models/Graph";
import NodeDrawing from "./NodeDrawing";
import Node from "~/models/Node";
import LinkDrawing from "./LinkDrawing";
import { setActiveItem } from "~/actions/index";
import { addNode } from "~/actions/controller";
import { ACTIVE_COLOR, LINK_COLOR } from "~/constants";

import styles from "./Canvas.less";

class Canvas extends React.Component {
	static renderDefs() {
		return (
			<defs>
				<marker
					id="arrow"
					markerUnits="strokeWidth"
					markerWidth="12"
					markerHeight="12"
					viewBox="0 0 12 12"
					refX="15"
					refY="6"
					orient="auto"
				>
					<path
						d="M2,2 L10,6 L2,10 L6,6 L2,2"
						style={{ fill: LINK_COLOR }}
					/>
				</marker>
				<marker
					id="arrow-active"
					markerUnits="strokeWidth"
					markerWidth="12"
					markerHeight="12"
					viewBox="0 0 12 12"
					refX="15"
					refY="6"
					orient="auto"
				>
					<path
						d="M2,2 L10,6 L2,10 L6,6 L2,2"
						style={{ fill: ACTIVE_COLOR }}
					/>
				</marker>
			</defs>
		);
	}

	onMouseDown(event) {
		if (event.ctrlKey) {
			let name;
			let similar = true;
			while (similar) {
				name = sillyName();
				similar = this.props.graph.nodes[name];
			}
			const node = new Node({
				name: sillyName(),
				x: event.clientX - this.offsetX,
				y: event.clientY - this.offsetY,
			});
			addNode(node);
		}
		this.props.setActiveItem(null);
	}

	get offsetX() {
		return this.svgNode.getBoundingClientRect().x + this.startFromX;
	}

	get offsetY() {
		return this.svgNode.getBoundingClientRect().y;
	}

	get startFromX() {
		const { minX } = this.props.graph;
		return minX <= 10 ? -minX + 15 : 0;
	}

	get startFromY() {
		const { minY } = this.props.graph;
		return minY <= 10 ? -minY + 15 : 0;
	}

	get endAtX() {
		const { maxX } = this.props.graph;
		return maxX + this.startFromX + 15;
	}

	get endAtY() {
		const { maxY } = this.props.graph;
		return maxY + this.startFromY + 15;
	}

	renderGraph() {
		return this.props.graph.nodeArray.map(node => (
			<NodeDrawing key={node.name} node={node} />
		));
	}

	renderLinks() {
		const { activeItem } = this.props;
		const linkArray = [...this.props.graph.linkArray];
		if (activeItem && activeItem.type === "LINK") {
			linkArray.sort((a, b) => {
				const { start, end } = activeItem;
				if (a.start.name === start && a.end.name === end) {
					return 1;
				}
				if (b.start.name === start && b.end.name === end) {
					return -1;
				}
				return 0;
			});
		}
		return linkArray.map((link, index) => (
			<LinkDrawing key={index} link={link} />
		));
	}

	render() {
		const { minX, maxX, minY, maxY } = this.props.graph;

		const startFromX = minX <= 10 ? -minX + 15 : 0;
		const startFromY = minY <= 10 ? -minY + 15 : 0;
		const endAtX = maxX + startFromX + 15;
		const endAtY = maxY + startFromY + 15;

		return (
			<div className={styles.svgWrapper}>
				<div className={styles.svgB}>
					<svg
						width={endAtX > 1000 ? endAtX : 1000}
						height={endAtY > 1000 ? endAtY : 1000}
						ref={svgNode => {
							this.svgNode = svgNode;
						}}
						onMouseDown={event => {
							this.onMouseDown(event);
						}}
					>
						{Canvas.renderDefs()}
						<g transform={`translate(${startFromX},${startFromY})`}>
							{this.renderLinks()}
							{this.renderGraph()}
						</g>
					</svg>
				</div>
			</div>
		);
	}
}

Canvas.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
	setActiveItem: PropTypes.func.isRequired,
	activeItem: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
	graph: state.graph,
	activeItem: state.activeItem,
});

const mapDispatchToProps = dispatch => ({
	setActiveItem: value => {
		dispatch(setActiveItem(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
