
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
