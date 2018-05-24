import {
	SET_GRAPH,
	SET_DISTANCE_TYPE,
	SET_START,
	SET_FINISH,
	SET_ACTIVE_ITEM,
	SET_SHOW_LINK_DOTS,
	SET_SHOW_NODE_TITLES,
} from "./types";

export const oneFieldDispatch = (type, payload) => async dispatch => {
	await dispatch({
		type,
		payload,
	});
};

export const setGraph = payload => oneFieldDispatch(SET_GRAPH, payload);

export const setStart = payload => oneFieldDispatch(SET_START, payload);

export const setFinish = payload => oneFieldDispatch(SET_FINISH, payload);

export const setDistanceType = payload =>
	oneFieldDispatch(SET_DISTANCE_TYPE, payload);

export const setActiveItem = payload =>
	oneFieldDispatch(SET_ACTIVE_ITEM, payload);

export const setShowLinkDots = payload =>
	oneFieldDispatch(SET_SHOW_LINK_DOTS, payload);

export const setShowNodeTitles = payload =>
	oneFieldDispatch(SET_SHOW_NODE_TITLES, payload);
