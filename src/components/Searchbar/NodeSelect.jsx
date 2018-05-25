import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import Node from "~/models/Node";

import "react-select/dist/react-select.css";

class NodeSelect extends React.Component {
	onChange(value) {
		this.props.onChange(value);
	}

	render() {
		return (
			<Select
				closeOnSelect
				multi
				onChange={value => {
					this.onChange(value);
				}}
				options={this.props.options}
				placeholder="Select nodes"
				value={this.props.value}
				labelKey="name"
				valueKey="name"
				clearable={false}
			/>
		);
	}
}

NodeSelect.propTypes = {
	options: PropTypes.arrayOf(PropTypes.instanceOf(Node)),
	value: PropTypes.arrayOf(PropTypes.instanceOf(Node)),
	onChange: PropTypes.func.isRequired,
};

export default NodeSelect;
