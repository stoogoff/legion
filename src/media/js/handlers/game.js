
import { handlerCreator } from "./base";
import { GAME_SELECT } from "../lib/action-keys";

const GAME_ACTIONS = {};


// TODO there's a lot more this needs to do and it will need to be asynchronous
GAME_ACTIONS[GAME_SELECT] = (state, payload) => {
	return payload;
};

export default handlerCreator(GAME_ACTIONS);
