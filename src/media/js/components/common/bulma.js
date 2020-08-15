
const PROPS_LIST = [
	// usage
	"primary", "link", "info", "success", "warning", "danger",

	// sizes
	"small", "normal", "medium", "large",

	// alignment
	"left", "right", "centered", "pulled-left", "pulled-right",

	// button colour styles
	"white", "light", "dark", "black", "text",

	// button sizes
	"fullwidth", "outlined", "inverted", "rounded", "loading", "boxed",

	// button states
	"hovered", "focused", "active", "disabled"
];

export const getClassList = (props, prefix = "") => [prefix, (props.className || ""), ...PROPS_LIST.filter(prop => prop in props && props[prop]).map(prop => "is-" + prop)].join(" ");
