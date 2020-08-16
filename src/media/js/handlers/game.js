
import { handlerCreator } from "./base";
import { database } from "../lib/firebase";
import { GAME_SELECT } from "../lib/action-keys";
import { createId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";


const GAME_ACTIONS = {};


// copy the game data, create a unique code for it and send it to the server
GAME_ACTIONS[GAME_SELECT] = async (state, payload) => {
	let upload = { ...payload };

	upload.code = createId();

	database.ref(STORAGE_KEYS.GAME_ROOT).child(upload.code).set(upload);

	return upload;
};

export default handlerCreator(GAME_ACTIONS);
