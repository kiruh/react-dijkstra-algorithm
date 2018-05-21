/* eslint-env browser */
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";

import reducer from "./reducers/";

/* eslint-disable no-underscore-dangle */
const isDev = process.env.NODE_ENV !== "production";
const logRedux = false;
const useLoggerAndDevTools = process.env.NODE_ENV !== "test" && isDev;
const composeEnhancers =
	(useLoggerAndDevTools && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;
/* eslint-enable */

const store = useLoggerAndDevTools
	? createStore(
			reducer,
			logRedux
				? composeEnhancers(applyMiddleware(createLogger(), thunk))
				: composeEnhancers(applyMiddleware(thunk)),
		)
	: createStore(reducer, applyMiddleware(thunk));

export default store;
