/* eslint-env browser */
import React from "react";

import Graph from "~/models/Graph";
import { changeGraph } from "~/actions/controller";

class Import extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			error: false,
		};
	}

	componentDidUpdate() {
		if (this.state.error) {
			this.hideError();
		}
	}

	hideError() {
		if (this.delay) return;
		this.delay = setTimeout(() => {
			this.setState({ error: false });
			this.delay = null;
		}, 2500);
	}

	import(files) {
		if (files.length <= 0) {
			return;
		}

		const fr = new FileReader();
		const file = files.item(0);

		if (file.type === "application/json") {
			fr.onload = async e => {
				try {
					const result = JSON.parse(e.target.result);
					const graph = Graph.fromJSON(result);
					changeGraph(graph);
				} catch (error) {
					this.setState({ error: true });
					console.error(error);
				}
			};
		}

		fr.readAsText(files.item(0));
	}

	renderErrorMsg() {
		if (!this.state.error) {
			return (
				<div
					className="alert alert-danger mt-2"
					style={{
						opacity: 0,
						transition: "opacity 0.2s ease-in-out",
					}}
				>
					Invalid JSON
				</div>
			);
		}
		return <div className="alert alert-danger mt-2">Invalid JSON</div>;
	}

	render() {
		return (
			<div className="custom-file mt-2">
				<input
					type="file"
					accept=".json,"
					className="custom-file-input"
					id="import-file"
					onChange={event => {
						const { files } = event.target;
						this.import(files);
					}}
				/>
				<label className="custom-file-label" htmlFor="import-file">
					Import JSON
				</label>
				{this.renderErrorMsg()}
			</div>
		);
	}
}

export default Import;
