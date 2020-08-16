
import { handlerCreator } from "./base";
import { database } from "../lib/firebase";
import { GAME_SELECT } from "../lib/action-keys";
import { createId } from "../lib/utils";
import { STORAGE_KEYS, SETUP } from "../lib/config";


const HOST_ACTIONS = {};


// copy the game data, create a unique code for it and send it to the server
HOST_ACTIONS[GAME_SELECT] = async (state, payload) => {
	let upload = { ...payload };

	upload.code = createId();
	upload.setup = SETUP.CREATED;

	// TODO the host player needs to be added

	database.ref(STORAGE_KEYS.GAME_ROOT).child(upload.code).set(upload);

	return upload;
};

export default handlerCreator(HOST_ACTIONS);
