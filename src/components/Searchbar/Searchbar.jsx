import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NodeSelect from "./NodeSelect";
import Graph from "~/models/Graph";
import Node from "~/models/Node";
import { setSelectedNodes } from "~/actions";
import { searchGraph } from "~/actions/controller";

import styles from "./Searchbar.less";

class Searchbar extends React.Component {
	renderNodeSelect() {
		return (
			<NodeSelect
				options={this.props.graph.nodeArray}
				value={this.props.selectedNodes}
				onChange={value => {
					this.props.setSelectedNodes(value);
				}}
			/>
		);
	}

	renderSearchButton() {
		return (
			<button
				className="mt-4 btn btn-primary"
				disabled={this.props.selectedNodes.length < 2}
				onClick={() => {
					searchGraph();
				}}
			>
				Search
			</button>
		);
	}

	render() {
		return (
			<nav id="searchbar" className={styles.searchbar}>
				{this.renderNodeSelect()}
				{this.renderSearchButton()}
			</nav>
		);
	}
}

Searchbar.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
	selectedNodes: PropTypes.arrayOf(PropTypes.instanceOf(Node)),
	setSelectedNodes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	graph: state.graph,
	selectedNodes: state.selectedNodes,
});

const mapDispatchToProps = dispatch => ({
	setSelectedNodes: value => {
		dispatch(setSelectedNodes(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
