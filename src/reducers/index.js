import setter from "./setter";
import { getInitialState } from "./reducerUtils";

export default (state = getInitialState(), action) => {
	let nextState = { ...state };
	const prevState = state;

	nextState = setter(nextState, action);

	nextState.prevState = prevState;
	return nextState;
};
