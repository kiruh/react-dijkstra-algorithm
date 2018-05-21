import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Graph from "~/models/Graph";
import { addNode, changeGraph } from "~/actions/controller";

class NodeInput extends React.Component {
	onNameChange(name) {
		if (!this.isValidName(name)) return;
		const graph = this.props.graph.copy();
		graph.nodes[this.node.name].name = name;
		changeGraph(graph);
	}

	onNumberInputChange(value, field) {
		const graph = this.props.graph.copy();
		graph.nodes[this.node.name][field] = Number(value);
		changeGraph(graph);
	}

	onSave() {
		const { name, weight, x, y } = this.node;
		addNode(name, weight, x, y);

		this.setState(this.getInitialState());
	}

	get node() {
		return this.props.graph.nodes[this.props.activeItem.name];
	}

	isValidName(name) {
		const similar = this.props.graph.nodes[name];
		return name && !similar;
	}

	renderNameInput() {
		return (
			<div className="form-group row">
				<label htmlFor="name" className="col-lg-6 col-form-label">
					Name:
				</label>
				<input
					id="name"
					className="form-control col-lg-6"
					value={this.node.name}
					onChange={event => {
						this.onNameChange(event.target.value);
					}}
				/>
			</div>
		);
	}

	renderNumberInput(field, label) {
		return (
			<div className="form-group row">
				<label htmlFor={field} className="col-lg-6 col-form-label">
					{label}:
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

	render() {
		return (
			<div>
				<div className="mb-4">
					<h5>{this.node.name}</h5>
				</div>
				{this.renderNumberInput("weight", "Weight")}
				{this.renderNumberInput("x", "X")}
				{this.renderNumberInput("y", "Y")}
			</div>
		);
	}
}

NodeInput.propTypes = {
	activeItem: PropTypes.objectOf(PropTypes.any).isRequired,
	graph: PropTypes.instanceOf(Graph).isRequired,
};

const mapStateToProps = state => ({
	graph: state.graph,
	activeItem: state.activeItem,
});

export default connect(mapStateToProps)(NodeInput);
