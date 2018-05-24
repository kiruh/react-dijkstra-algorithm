import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LinkMenu from "./LinkMenu";
import NodeMenu from "./NodeMenu";

import styles from "./Menu.less";

class Menu extends React.Component {
	renderNodeMenu() {
		if (!this.props.activeItem || this.props.activeItem.type !== "NODE") {
			return null;
		}
		return <NodeMenu />;
	}

	renderLinkMenu() {
		if (!this.props.activeItem || this.props.activeItem.type !== "LINK") {
			return null;
		}
		return <LinkMenu />;
	}

	render() {
		return (
			<nav id="sidebar" className={styles.sidebar}>
				{this.renderNodeMenu()}
				{this.renderLinkMenu()}
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
