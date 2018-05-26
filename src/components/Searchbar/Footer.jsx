import React from "react";

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return { help: false };
	}

	renderHelp() {
		if (!this.state.help) return null;

		return (
			<div className="mt-2">
				<p>
					This application helps you find the nearset path from one
					node to another based on node coordinates, link lengths or
					nodes weight.
				</p>
				<p>Shortcuts to manage your graph:</p>
				<p>
					<strong>Ctrl+Click on sheet</strong>: Add node
				</p>
				<p>
					<strong>Click on node</strong>: Select node
				</p>
				<p>
					<strong>Ctrl+Click on node</strong>: Add link from selected
					node to current
				</p>
				<p>
					<strong>Click on link</strong>: Select link
				</p>
				<p>
					Select nodes and click search button to find nearest path
					from one node to another. If you select more than 2 nodes,
					paths are gonna be chained.
				</p>
				<p>
					Use right sidebar to manage properties of the selected nodes
					and links. (weight, length etc.)
				</p>
				<p>You can import/export graphes in JSON format.</p>
				<p>Click on magic button to load example graph.</p>
			</div>
		);
	}

	render() {
		const { help } = this.state;
		return (
			<div className="mt-5">
				<hr />
				<a
					href="https://github.com/kiruh/graphes"
					className="btn btn-link"
					target="blank"
				>
					GitHub
				</a>
				<button
					type="button"
					className="btn btn-link"
					onClick={() => {
						this.setState({ help: !help });
					}}
				>
					Help
				</button>
				{this.renderHelp()}
			</div>
		);
	}
}

export default Footer;
