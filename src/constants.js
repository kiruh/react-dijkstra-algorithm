import randomColor from "random-color";

const getRandomColors = () =>
	[...Array(100).keys()].map(() => randomColor().hexString());

export const NODE_COLOR = "#212121";
export const LINK_COLOR = "#424242";
export const ACTIVE_COLOR = "#1976D2";
export const FADE_COLOR = "#eeeeee";
export const DANGER_COLOR = "#dc3545";
export const COLORS = getRandomColors();

export const HARCODED_GRAPH = {
	nodes: [
		{ name: "Howler", weight: 345, x: 312.25, y: 511 },
		{ name: "Sheergrabber", weight: 46, x: 321.84375, y: 271 },
		{ name: "Frillllama", weight: 235, x: 140.25, y: 544 },
		{ name: "Trader", weight: 690, x: 505.25, y: 312 },
		{ name: "Loon", weight: 52, x: 138.5, y: 113 },
		{ name: "Butterrider", weight: 45, x: 203.25, y: 427 },
		{ name: "Chocolatetongue", weight: 35, x: 48.25, y: 468 },
		{ name: "Fankoala", weight: 502, x: 205.5, y: 220 },
		{ name: "Pebblecrafter", weight: 53, x: 476.25, y: 402 },
		{ name: "Ninja", weight: 325, x: 373.25, y: 352 },
		{ name: "Swallow", weight: 234, x: 510.25, y: 521 },
		{ name: "Fuschiapirate", weight: 870, x: 287.25, y: 24 },
		{ name: "Nickelknife", weight: 24, x: 34.5, y: 35 },
		{ name: "Nebulafancier", weight: 650, x: 479.25, y: 130 },
		{ name: "Lakethroat", weight: 436, x: 30.5, y: 210 },
		{ name: "Princess", weight: 46, x: 340.25, y: 400 },
		{ name: "Scourge", weight: 540, x: 124.5, y: 333 },
		{ name: "Ripplemustang", weight: 35, x: 259.25, y: 529 },
		{ name: "Skydog", weight: 12, x: 568.25, y: 43 },
		{ name: "Bigox", weight: 42, x: 206.25, y: 323 },
		{ name: "Pricklelady", weight: 31, x: 562.25, y: 410 },
		{ name: "Lovechin", weight: 97, x: 282.25, y: 118 },
	],
	links: [
		{ start: "Nickelknife", length: 24, end: "Loon" },
		{ start: "Loon", length: 19, end: "Nickelknife" },
		{ start: "Loon", length: 149, end: "Fankoala" },
		{ start: "Loon", length: 124, end: "Lakethroat" },
		{ start: "Loon", length: 14, end: "Lovechin" },
		{ start: "Fankoala", length: 14, end: "Loon" },
		{ start: "Fankoala", length: 14, end: "Scourge" },
		{ start: "Fankoala", length: 14, end: "Sheergrabber" },
		{ start: "Scourge", length: 364, end: "Lakethroat" },
		{ start: "Scourge", length: 565, end: "Fankoala" },
		{ start: "Scourge", length: 213, end: "Bigox" },
		{ start: "Sheergrabber", length: 656, end: "Fankoala" },
		{ start: "Sheergrabber", length: 5656, end: "Nebulafancier" },
		{
			start: "Sheergrabber",
			length: 2313,
			end: "Trader",
		},
		{ start: "Sheergrabber", length: 24, end: "Butterrider" },
		{ start: "Sheergrabber", length: 24, end: "Ninja" },
		{ start: "Lakethroat", length: 223, end: "Loon" },
		{ start: "Lakethroat", length: 76, end: "Scourge" },
		{ start: "Fuschiapirate", length: 4, end: "Nebulafancier" },
		{ start: "Lovechin", length: 346, end: "Fuschiapirate" },
		{ start: "Lovechin", length: 4, end: "Trader" },
		{ start: "Nebulafancier", length: 214, end: "Skydog" },
		{ start: "Trader", length: 4, end: "Pricklelady" },
		{ start: "Princess", length: 67, end: "Pebblecrafter" },
		{
			start: "Chocolatetongue",
			length: 43,
			end: "Scourge",
		},
		{
			start: "Chocolatetongue",
			length: 453,
			end: "Frillllama",
		},
		{ start: "Howler", length: 547, end: "Butterrider" },
		{
			start: "Butterrider",
			length: 23,
			end: "Chocolatetongue",
		},
		{ start: "Swallow", length: 64, end: "Princess" },
		{ start: "Pricklelady", length: 46, end: "Swallow" },
		{ start: "Skydog", length: 4, end: "Trader" },
		{ start: "Pebblecrafter", length: 45, end: "Princess" },
		{ start: "Pebblecrafter", length: 5, end: "Howler" },
		{
			start: "Ripplemustang",
			length: 534,
			end: "Frillllama",
		},
	],
};
