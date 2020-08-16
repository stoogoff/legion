
export const createId = (length = 6) => {
	let output = [];
	const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for(let i = 0; i < length; ++i) {
		output.push(characters[Math.floor(characters.length * Math.random())]);
	}

	return output.join("");
}

export const replaceId = (key, ...props) => {
	props.forEach(p => key = key.replace("$ID$", p));

	return key;
}