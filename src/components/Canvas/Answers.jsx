import React from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";

import Graph from "~/models/Graph";
import NodeDrawing from "./NodeDrawing";
import LinkDrawing from "./LinkDrawing";
import { FADE_COLOR, COLORS } from "~/constants";

class Answers extends React.Component {
	drawFadedNodes() {
		const { graph } = this.props;
		const { nodeArray } = graph;

		nodeArray.forEach(node => {
			const drawn = this.drawnNodes.some(n => n.name === node.name);
			if (!drawn) {
				this.nodeDom.unshift(
					<NodeDrawing
						key={node.name}
						node={node}
						color={FADE_COLOR}
						notClickable
					/>,
				);
			}
		});
	}

	drawFadedLinks() {
		const { graph } = this.props;
		const { linkArray } = graph;

		linkArray.forEach(link => {
			const drawn = this.drawnLinks.some(
				lnk =>
					lnk.start.name === link.start.name &&
					lnk.end.name === link.end.name,
			);
			if (!drawn) {
				this.linkDom.unshift(
					<LinkDrawing
						key={`${link.start.name}->${link.end.name}`}
						link={link}
						color={FADE_COLOR}
						notClickable
					/>,
				);
			}
		});
	}

	drawAnswerNode(node, color) {
		this.nodeDom.push(
			<NodeDrawing
				key={uuidv4()}
				node={node}
				color={color}
				notClickable
			/>,
		);
		this.drawnNodes.push(node);
	}

	drawAnswerLink(prev, current, color) {
		const { graph } = this.props;
		const { linkArray } = graph;

		const link = linkArray.find(
			lnk =>
				lnk.start.name === prev.name && lnk.end.name === current.name,
		);

		if (!link) return;
		this.linkDom.push(
			<LinkDrawing
				key={uuidv4()}
				link={link}
				color={color}
				notClickable
			/>,
		);
		this.drawnLinks.push(link);
	}

	drawAnswer(answer, color) {
		answer.path.forEach((node, index) => {
			this.drawAnswerNode(node, color);
			if (index === 0) return;

			const prev = answer.path[index - 1];
			this.drawAnswerLink(prev, node, color);
		});
	}

	drawAnswers() {
		const { answers } = this.props;

		answers.forEach((answer, j) => {
			const color = COLORS[j];
			if (!answer.path) return;
			this.drawAnswer(answer, color);
		});
	}

	reset() {
		this.drawnNodes = [];
		this.drawnLinks = [];
		this.nodeDom = [];
		this.linkDom = [];
	}

	get answersDOM() {
		return [...this.linkDom, ...this.nodeDom];
	}

	renderAnswers() {
		this.reset();

		this.drawAnswers();
		this.drawFadedNodes();
		this.drawFadedLinks();

		return this.answersDOM;
	}

	render() {
		if (!this.props.answers) return null;
		return <React.Fragment>{this.renderAnswers()}</React.Fragment>;
	}
}

Answers.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
	answers: PropTypes.arrayOf(PropTypes.any),
};

export default Answers;
