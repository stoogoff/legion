
// actions in this file relate to the host setting up the game

import { createPlayer } from "./crud";
import { database } from "../lib/firebase";
import { handlerCreator, createId, replaceId } from "../lib/utils";
import { STORAGE_KEYS, SETUP, DEFAULT_HOST_NAME } from "../lib/config";
import getLogger from "../lib/logger";

// this file handles the following actions
import {
	GAME_SELECT,
	SIGNED_IN,
	CHARACTER_STATE_CHANGED
} from "../lib/action-keys";


const logger = getLogger("game-host", 15);
const ACTIONS = {};


// copy the game data, create a unique code for it and send it to the server
ACTIONS[GAME_SELECT] = async (state, payload) => {
	let upload = { ...payload, code: createId(), setup: SETUP.CREATED };

	// create the game, and once its done create the host player
	database.ref(STORAGE_KEYS.GAME_ROOT).child(upload.code).set(upload).then(() => {
		createPlayer(upload.code, DEFAULT_HOST_NAME);
	});

	return upload;
};

// all of the players have signed in and the host has pressed the setup button
// update the game state on the server
ACTIONS[SIGNED_IN] = async (state, payload) => {
	logger.log(SIGNED_IN, state, payload)

	database.ref(replaceId(STORAGE_KEYS.GAME_SETUP, state.code)).set(SETUP.SIGNED_IN);

	return { ...state, setup: SETUP.SIGNED_IN };
};

// the state of the characters has changed, meaning someone has chosen one
// TODO this is a duplicate of the same thing in game-player.js
ACTIONS[CHARACTER_STATE_CHANGED] = async (state, payload) => {
	logger.log(CHARACTER_STATE_CHANGED, state, payload)

	return { ...state, pcs: payload };
};

export default handlerCreator(ACTIONS);
