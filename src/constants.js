import randomColor from "random-color";

const getRandomColors = () =>
	[...Array(100).keys()].map(() => randomColor().hexString());

export const NODE_COLOR = "#212121";
export const LINK_COLOR = "#424242";
export const ACTIVE_COLOR = "#1976D2";
export const FADE_COLOR = "#eeeeee";
export const COLORS = getRandomColors();
