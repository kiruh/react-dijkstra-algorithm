import React from "react";
import Canvas from "./Canvas/";
import Menu from "./Menu";

const App = () => (
	<div className="row">
		<div className="col-md-2">
			<Menu />
		</div>
		<div className="col-md-8">
			<Canvas />
		</div>
		<div className="col-md-2">menu</div>
	</div>
);

export default App;
