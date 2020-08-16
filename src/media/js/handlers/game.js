
import { handlerCreator } from "./base";
import { database } from "../lib/firebase";
import { GAME_SELECT } from "../lib/action-keys";
import { createId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";


const GAME_ACTIONS = {};


// TODO this will need to send the selection to firebase so other players are aware of the game
GAME_ACTIONS[GAME_SELECT] = async (state, payload) => {
	let upload = { ...payload };

	upload.code = createId();

	database.ref(STORAGE_KEYS.GAME_ROOT).child(upload.code).set(upload);

	return upload;
};

export default handlerCreator(GAME_ACTIONS);
