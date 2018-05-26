import React from "react";

import Export from "./Export";
import Import from "./Import";
import ClearGraph from "./ClearGraph";
import LoadExample from "./LoadExample";

const ImportExport = () => (
	<div className="mx--15px mt-4">
		<Export />
		<ClearGraph />
		<LoadExample />
		<Import />
	</div>
);

export default ImportExport;
