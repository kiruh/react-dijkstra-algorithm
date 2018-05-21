import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Graph from "~/models/Graph";
import { addNode } from "~/actions/controller";

class NodeInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			name: "",
			weight: 0,
			x: 0,
			y: 0,
		};
	}

	onNameChange(name) {
		this.setState({ name });
	}

	onNumberInputChange(value, field) {
		this.setState({
			[field]: Number(value),
		});
	}

	onSave() {
		const { name, weight, x, y } = this.state;
		addNode(name, weight, x, y);
		console.log(2892389);

		this.setState(this.getInitialState());
	}

	isValid() {
		const { name } = this.state;
		const similar = this.props.graph.nodes[name];
		return name && !similar;
	}

	renderNameInput() {
		return (
			<div className="form-group row">
				<label htmlFor="name" className="col-sm-2 col-form-label">
					Name:
				</label>
				<input
					id="name"
					className="form-control col-sm-10"
					value={this.state.name}
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
				<label htmlFor={field} className="col-sm-2 col-form-label">
					{label}:
				</label>
				<input
					id={field}
					className="form-control col-sm-10"
					type="number"
					value={this.state[field]}
					onChange={event => {
						this.onNumberInputChange(event.target.value, field);
					}}
				/>
			</div>
		);
	}

	renderAccept() {
		return (
			<button
				className="btn btn-primary float-right"
				disabled={!this.isValid()}
				onClick={() => {
					this.onSave();
				}}
			>
				Add
			</button>
		);
	}

	render() {
		return (
			<div>
				{this.renderNameInput()}
				{this.renderNumberInput("weight", "Weight")}
				{this.renderNumberInput("x", "X")}
				{this.renderNumberInput("y", "Y")}
				{this.renderAccept()}
			</div>
		);
	}
}

NodeInput.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
};

const mapStateToProps = state => ({
	graph: state.graph,
});

export default connect(mapStateToProps)(NodeInput);
