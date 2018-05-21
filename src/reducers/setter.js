import { ONE_FIELD_SETTERS } from "./reducerUtils";

export default function setter(state, action) {
	/**
	 * if action.type is in the ONE_FIELD_SETTERS
	 * apply abstraction
	 * - copy previous state
	 * - replace field with action.payload
	 * e.g. if action.type is SET_TEAMS then field should be equal "teams"
	 */

	if (Object.prototype.hasOwnProperty.call(ONE_FIELD_SETTERS, action.type)) {
		const field = ONE_FIELD_SETTERS[action.type];
		return {
			...state,
			[field]: action.payload,
		};
	}

	return state;
}
