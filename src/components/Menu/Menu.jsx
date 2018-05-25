import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LinkMenu from "./LinkMenu";
import NodeMenu from "./NodeMenu";
import { setShowLinkDots, setShowProperties } from "~/actions";

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

	renderShowLinkDotsToggle() {
		return (
			<div className="custom-control custom-checkbox">
				<input
					id="showLinkDots"
					type="checkbox"
					className="custom-control-input"
					checked={this.props.showLinkDots}
					onChange={event => {
						this.props.setShowLinkDots(event.target.checked);
					}}
				/>
				<label className="custom-control-label" htmlFor="showLinkDots">
					Show link dots
				</label>
			</div>
		);
	}

	renderShowPropertiesToggle() {
		return (
			<div className="custom-control custom-checkbox">
				<input
					id="showProperties"
					type="checkbox"
					className="custom-control-input"
					checked={this.props.showProperties}
					onChange={event => {
						this.props.setShowProperties(event.target.checked);
					}}
				/>
				<label
					className="custom-control-label"
					htmlFor="showProperties"
				>
					Show properties
				</label>
			</div>
		);
	}

	render() {
		return (
			<nav id="sidebar" className={styles.sidebar}>
				{this.renderNodeMenu()}
				{this.renderLinkMenu()}
				<div className="mx--15px mt-4">
					{this.renderShowLinkDotsToggle()}
					{this.renderShowPropertiesToggle()}
				</div>
			</nav>
		);
	}
}

Menu.propTypes = {
	activeItem: PropTypes.objectOf(PropTypes.any),
	showLinkDots: PropTypes.bool.isRequired,
	showProperties: PropTypes.bool.isRequired,
	setShowLinkDots: PropTypes.func.isRequired,
	setShowProperties: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	activeItem: state.activeItem,
	showLinkDots: state.showLinkDots,
	showProperties: state.showProperties,
});

const mapDispatchToProps = dispatch => ({
	setShowLinkDots: value => {
		dispatch(setShowLinkDots(value));
	},
	setShowProperties: value => {
		dispatch(setShowProperties(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
