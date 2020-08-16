
import React from "react";

// display the first child node with property display === true
// if no child has display === true, display the last component in the list
export default (props) => {
	let component = null;

	for(let i = 0, len = props.children.length; i < len; ++i) {
		if(props.children[i].props.display === true) {
			component = props.children[i];
			break;
		}
	}

	if(!component) {
		component = props.children[props.children.length - 1];
	}

	return component;
};
