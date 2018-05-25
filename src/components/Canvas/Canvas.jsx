import React from "react";
import PropTypes from "prop-types";
import sillyName from "sillyname";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";

import Graph from "~/models/Graph";
import NodeDrawing from "./NodeDrawing";
import Node from "~/models/Node";
import LinkDrawing from "./LinkDrawing";
import { setActiveItem } from "~/actions/index";
import { addNode } from "~/actions/controller";
import { ACTIVE_COLOR, LINK_COLOR, FADE_COLOR, COLORS } from "~/constants";

import styles from "./Canvas.less";

class Canvas extends React.Component {
	static renderArrow(color) {
		return (
			<marker
				key={color}
				id={`arrow-${color}`}
				markerUnits="strokeWidth"
				markerWidth="12"
				markerHeight="12"
				viewBox="0 0 12 12"
				refX="10"
				refY="3"
				orient="auto"
			>
				<path d="M0,0 L6,3 L0,6 L0,0" style={{ fill: color }} />
			</marker>
		);
	}

	static renderArrowSet() {
		return COLORS.map(color => Canvas.renderArrow(color));
	}

	static renderDefs() {
		// d="M2,2 L10,6 L2,10 L6,6 L2,2"
		return (
			<defs>
				{Canvas.renderArrow(LINK_COLOR)}
				{Canvas.renderArrow(FADE_COLOR)}
				{Canvas.renderArrow(ACTIVE_COLOR)}
				{Canvas.renderArrowSet()}
			</defs>
		);
	}

	onMouseDown(event) {
		if (this.props.answers) return;

		if (event.ctrlKey) {
			let name;
			let similar = true;
			while (similar) {
				name = sillyName();
				similar = this.props.graph.nodes[name];
			}
			const node = new Node({
				name,
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
		return linkArray.map(link => (
			<LinkDrawing
				key={`${link.start.name}->${link.end.name}`}
				link={link}
			/>
		));
	}

	renderAnswers() {
		const linkArray = [...this.props.graph.linkArray];
		const nodeArray = [...this.props.graph.nodeArray];

		const drawnNodes = [];
		const drawnLinks = [];

		const nodeDom = [];
		const linkDom = [];

		this.props.answers.forEach((answer, j) => {
			const color = COLORS[j];
			if (!answer.path) return;
			answer.path.forEach((node, index) => {
				nodeDom.push(
					<NodeDrawing
						key={uuidv4()}
						node={node}
						color={color}
						notClickable
					/>,
				);
				drawnNodes.push(node);
				if (index > 0) {
					const prev = answer.path[index - 1];
					const link = linkArray.find(
						lnk =>
							lnk.start.name === prev.name &&
							lnk.end.name === node.name,
					);
					linkDom.push(
						<LinkDrawing
							key={uuidv4()}
							link={link}
							color={color}
							notClickable
						/>,
					);
					drawnLinks.push(link);
				}
			});
		});

		nodeArray.forEach(node => {
			const drawn = drawnNodes.some(n => n.name === node.name);
			if (!drawn) {
				nodeDom.unshift(
					<NodeDrawing
						key={node.name}
						node={node}
						color={FADE_COLOR}
						notClickable
					/>,
				);
			}
		});

		linkArray.forEach(link => {
			const drawn = drawnLinks.some(
				lnk =>
					lnk.start.name === link.start.name &&
					lnk.end.name === link.end.name,
			);
			if (!drawn) {
				linkDom.unshift(
					<LinkDrawing
						key={`${link.start.name}->${link.end.name}`}
						link={link}
						color={FADE_COLOR}
						notClickable
					/>,
				);
			}
		});

		return [...linkDom, ...nodeDom];
	}

	renderContent() {
		if (this.props.answers) {
			return this.renderAnswers();
		}
		return (
			<React.Fragment>
				{this.renderLinks()}
				{this.renderGraph()}
			</React.Fragment>
		);
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
							{this.renderContent()}
						</g>
					</svg>
				</div>
			</div>
		);
	}
}

Canvas.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
	answers: PropTypes.arrayOf(PropTypes.any),
	setActiveItem: PropTypes.func.isRequired,
	activeItem: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
	graph: state.graph,
	answers: state.answers,
	activeItem: state.activeItem,
});

const mapDispatchToProps = dispatch => ({
	setActiveItem: value => {
		dispatch(setActiveItem(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
