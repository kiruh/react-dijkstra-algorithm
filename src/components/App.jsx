import React from "react";
import Canvas from "./Canvas/";
import Menu from "./Menu";
import Searchbar from "./Searchbar";

const App = () => (
	<div className="row">
		<div className="col-md-3">
			<Searchbar />
		</div>
		<div className="col-md-6">
			<Canvas />
		</div>
		<div className="col-md-3">
			<Menu />
		</div>
	</div>
);

export default App;
