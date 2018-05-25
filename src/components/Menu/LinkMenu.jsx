import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import KeyHandler, { KEYPRESS } from "react-key-handler";

import Graph from "~/models/Graph";
import { changeGraph } from "~/actions/controller";

class LinkMenu extends React.Component {
	onLengthChange(value) {
		if (value <= 0) return;
		const { activeItem } = this.props;
		const { start, end } = activeItem;
		const graph = this.props.graph.copy();

		const node = graph.nodes[start];
		const link = node.paths.find(p => p.toNodeName === end);
		link.length = Number(value);

		changeGraph(graph);
	}

	get link() {
		const { graph, activeItem } = this.props;
		const { start, end } = activeItem;
		const node = graph.nodes[start];
		return node.paths.find(p => p.toNodeName === end);
	}

	deleteLink() {
		const { activeItem } = this.props;
		const { start, end } = activeItem;
		const graph = this.props.graph.copy();

		const node = graph.nodes[start];
		node.removeLink(end);

		changeGraph(graph);
	}

	renderLengthInput() {
		return (
			<div className="form-group row">
				<label
					htmlFor={"length"}
					className="col-lg-6 col-form-label px-0"
				>
					Length
				</label>
				<input
					id={"length"}
					className="form-control col-lg-6"
					type="number"
					value={this.link.length}
					onChange={event => {
						this.onLengthChange(event.target.value);
					}}
				/>
			</div>
		);
	}

	renderDeleteButton() {
		const handle = () => {
			this.deleteLink();
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
					Delete Link
				</button>
			</React.Fragment>
		);
	}

	render() {
		if (!this.link) return null;

		return (
			<div>
				{this.renderLengthInput()}
				{this.renderDeleteButton()}
			</div>
		);
	}
}

LinkMenu.propTypes = {
	activeItem: PropTypes.objectOf(PropTypes.any).isRequired,
	graph: PropTypes.instanceOf(Graph).isRequired,
};

const mapStateToProps = state => ({
	graph: state.graph,
	activeItem: state.activeItem,
});

export default connect(mapStateToProps, null)(LinkMenu);
