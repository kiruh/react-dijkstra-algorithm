import React from "react";
import PropTypes from "prop-types";
import sillyname from "sillyname";
import { connect } from "react-redux";

import Graph from "~/models/Graph";

class Export extends React.Component {
	getDataURI() {
		const dataStr = JSON.stringify(this.props.graph.toJSON());
		const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
			dataStr,
		)}`;
		return dataUri;
	}

	render() {
		return (
			<a
				title="Save as JSON"
				className="btn btn-light"
				href={this.getDataURI()}
				download={`${sillyname()}.json`}
			>
				<i className="fas fa-download" />
			</a>
		);
	}
}

Export.propTypes = {
	graph: PropTypes.instanceOf(Graph).isRequired,
};

const mapStateToProps = state => ({
	graph: state.graph,
});

export default connect(mapStateToProps)(Export);
