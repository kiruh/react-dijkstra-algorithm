import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NodeSelect from "./NodeSelect";
import Graph from "~/models/Graph";
import { searchGraph, clearAnswers } from "~/actions/controller";

import styles from "./Searchbar.less";

class Searchbar extends React.Component {
	static getDerivedStateFromProps(props, state) {
		const selectedNodes = state.selectedNodes.filter(
			node => !!props.graph.nodes[node.name],
		);
		return { ...state, selectedNodes };
	}

	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			selectedNodes: [],
		};
	}

	setSelectedNodes(selectedNodes) {
		this.setState({ selectedNodes });
		clearAnswers();
	}

	renderNodeSelect() {
		return (
			<NodeSelect
				options={this.props.graph.nodeArray}
				value={this.state.selectedNodes}
				onChange={value => {
					this.setSelectedNodes(value);
				}}
			/>
		);
	}

	renderSearchButton() {
		if (this.props.answers) return null;
		return (
			<button
				className="btn btn-primary"
				disabled={this.state.selectedNodes.length < 2}
				onClick={() => {
					searchGraph(this.state.selectedNodes);
				}}
			>
				Search
			</button>
		);
	}

	renderClearAnswersButton() {
		if (!this.props.answers) return null;
		return (
			<button
				className="btn btn-danger"
				onClick={() => {
					clearAnswers();
				}}
			>
				Clear Search
			</button>
		);
	}

	renderAnswers() {
		if (!this.props.answers) return null;
		return this.props.answers.map((answer, index) => {
			if (!answer.path) {
				return (
					<div key={index} className="alert alert-warning">
						No path from {answer.start} to {answer.end}
					</div>
				);
			}
			const pathInfo = answer.path.reduce((pthinf, node) => {
				if (!pthinf) return node.name;
				return `${pthinf} > ${node.name}`;
			}, null);
			return (
				<div key={index} className="alert alert-info">
					{pathInfo}
				</div>
			);
		});
	}

	render() {
		return (
			<nav id="searchbar" className={styles.searchbar}>
				{this.renderNodeSelect()}
				<div className="mt-4">
					{this.renderSearchButton()}
					{this.renderClearAnswersButton()}
				</div>
				<div className="mt-4">{this.renderAnswers()}</div>
			</nav>
		);
	}
}

Searchbar.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
	answers: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
	graph: state.graph,
	answers: state.answers,
});

export default connect(mapStateToProps, null)(Searchbar);
