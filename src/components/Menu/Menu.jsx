import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NodeInput from "./NodeInput";

import styles from "./Menu.less";

class Menu extends React.Component {
	renderNodeMenu() {
		if (!this.props.activeItem || this.props.activeItem.type !== "NODE") {
			return null;
		}
		return <NodeInput />;
	}

	render() {
		return (
			<nav id="sidebar" className={styles.sidebar}>
				{this.renderNodeMenu()}
			</nav>
		);
	}
}

Menu.propTypes = {
	activeItem: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
	activeItem: state.activeItem,
});

export default connect(mapStateToProps)(Menu);
