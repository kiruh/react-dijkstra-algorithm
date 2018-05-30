import React from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";

import DijkstraSearch from "~/models/DijkstraSearch";
import { setDistanceType } from "~/actions";

const OPTIONS = [
	{ key: DijkstraSearch.BY_COORDINATES, value: "Use coordinates" },
	{ key: DijkstraSearch.BY_LINK_LENGTH, value: "Use link length" },
	{ key: DijkstraSearch.BY_WEIGHT, value: "Use weight" },
];

class DistanceType extends React.Component {
	constructor(props) {
		super(props);
		this.toggleId = `toggle-${uuidv4()}`;
	}

	isChecked(value) {
		return this.props.distanceType === value;
	}

	renderOptions() {
		return OPTIONS.map(option => (
			<div key={option.key} className="custom-control custom-radio">
				<input
					className="custom-control-input"
					type="radio"
					name={this.toggleId}
					id={option.key}
					value={option.key}
					onChange={input => {
						this.props.setDistanceType(input.target.value);
						this.props.onChange();
					}}
					checked={this.isChecked(option.key)}
				/>
				<label className="custom-control-label" htmlFor={option.key}>
					{option.value}
				</label>
			</div>
		));
	}

	render() {
		return <div className="my-4 ml-1">{this.renderOptions()}</div>;
	}
}

DistanceType.propTypes = {
	distanceType: PropTypes.string.isRequired,
	setDistanceType: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	distanceType: state.distanceType,
});

const mapDispatchToProps = dispatch => ({
	setDistanceType: value => {
		dispatch(setDistanceType(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(DistanceType);
