
import { handlerCreator } from "./base";
import { createPlayer } from "./create";
import { database } from "../lib/firebase";
import { createId, replaceId } from "../lib/utils";
import { STORAGE_KEYS, SETUP, DEFAULT_HOST_NAME } from "../lib/config";
import getLogger from "../lib/logger";
import {
	GAME_SELECT,
	SIGNED_IN
} from "../lib/action-keys";


const logger = getLogger("hostHandler", 15);
const HOST_ACTIONS = {};


// copy the game data, create a unique code for it and send it to the server
HOST_ACTIONS[GAME_SELECT] = async (state, payload) => {
	let upload = { ...payload };

	upload.code = createId();
	upload.setup = SETUP.CREATED;

	// create the game, and once its done create the host player
	database.ref(STORAGE_KEYS.GAME_ROOT).child(upload.code).set(upload).then(() => {
		createPlayer(upload.code, DEFAULT_HOST_NAME);
	});


	return upload;
};

// all of the players have signed in and the host has pressed the setup button
// update the game state on the server
HOST_ACTIONS[SIGNED_IN] = async (state, payload) => {
	logger.log(SIGNED_IN, state, payload)

	database.ref(replaceId(STORAGE_KEYS.GAME_SETUP, state.code)).set(SETUP.SIGNED_IN);

	let updated = { ...state };

	updated.setup = SETUP.SIGNED_IN;

	return updated;
};

export default handlerCreator(HOST_ACTIONS);
