import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import KeyHandler, { KEYPRESS } from "react-key-handler";

import Graph from "~/models/Graph";
import { setActiveItem } from "~/actions";
import { changeGraph, onNodeClick } from "~/actions/controller";

class NodeMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
		};
	}

	onNameChange(name) {
		this.setState({
			name,
		});
	}

	onNumberInputChange(value, field) {
		const graph = this.props.graph.copy();
		graph.nodes[this.node.name][field] = Number(value);
		changeGraph(graph);
	}

	acceptNameChange() {
		if (!this.isValidName()) return;
		const { name } = this.state;

		const graph = this.props.graph.copy();
		graph.changeNodeName(this.node, name);
		this.props.setActiveItem({
			type: "NODE",
			name,
		});
		changeGraph(graph);

		this.setState({
			name: null,
		});
	}

	get node() {
		return this.props.graph.nodes[this.props.activeItem.name];
	}

	get name() {
		return this.state.name === null ? this.node.name : this.state.name;
	}

	isValidName() {
		const similar = this.props.graph.nodes[this.name];
		return this.name && !similar;
	}

	deleteNode() {
		onNodeClick(this.node, false, true);
	}

	renderNameInput() {
		return (
			<div className="mx--15px mt-4">
				<input
					id="name"
					className="form-control"
					value={this.name}
					onChange={event => {
						this.onNameChange(event.target.value);
					}}
					onKeyDown={event => {
						if (event.keyCode === 13) {
							this.acceptNameChange();
						}
					}}
				/>
				<button
					className="btn mt-2"
					disabled={!this.isValidName()}
					onClick={() => {}}
				>
					Change Name
				</button>
			</div>
		);
	}

	renderNumberInput(field, label) {
		return (
			<div className="form-group row">
				<label htmlFor={field} className="col-lg-6 col-form-label px-0">
					{label}
				</label>
				<input
					id={field}
					className="form-control col-lg-6"
					type="number"
					value={this.node[field]}
					onChange={event => {
						this.onNumberInputChange(event.target.value, field);
					}}
				/>
			</div>
		);
	}

	renderDeleteButton() {
		const handle = () => {
			this.deleteNode();
		};

		return (
			<React.Fragment>
				<KeyHandler
					keyEventName={KEYPRESS}
					keyCode={127}
					onKeyHandle={handle}
				/>
				<button
					className="btn btn-danger mx--15px mt-4"
					onClick={handle}
				>
					Delete Node
				</button>
			</React.Fragment>
		);
	}

	render() {
		if (!this.node) return null;

		return (
			<div>
				{this.renderNumberInput("weight", "Weight")}
				{this.renderNumberInput("x", "X")}
				{this.renderNumberInput("y", "Y")}
				{this.renderNameInput()}
				{this.renderDeleteButton()}
			</div>
		);
	}
}

NodeMenu.propTypes = {
	activeItem: PropTypes.objectOf(PropTypes.any).isRequired,
	graph: PropTypes.instanceOf(Graph).isRequired,
	setActiveItem: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(NodeMenu);
