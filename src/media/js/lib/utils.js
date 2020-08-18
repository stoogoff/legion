
// create a random uppercase alphanumeric string of the supplied length
export const createId = (length = 6) => {
	let output = [];
	const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for(let i = 0; i < length; ++i) {
		output.push(characters[Math.floor(characters.length * Math.random())]);
	}

	return output.join("");
}

// replace any $ID$ parts in a string with subsequent arguments, e.g.
// replaceId("/path/$ID$", "1234") -> "/path/1234"
// replaceId("/path/$ID$/item/$ID$", "1234", "ABC") -> "/path/1234/item/ABC"
export const replaceId = (key, ...props) => {
	props.forEach(p => key = key.replace("$ID$", p));

	return key;
}


export const handlerCreator = (actions) => {
	return (state = [], action, payload) => {
		if(action in actions) {
			return actions[action](state, payload);
		}
		else {
			return state;
		}
	}
}
