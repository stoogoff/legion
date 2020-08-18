
// actions in this file relate to players signing up to the game

import { createPlayer } from "./crud";
import { database } from "../lib/firebase";
import { handlerCreator, replaceId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";
import getLogger from "../lib/logger";

// this file handles the following actions
import {
	PLAYER_LOGIN,
	GAME_STATE_CHANGED,
	CHARACTER_STATE_CHANGED
} from "../lib/action-keys";


const logger = getLogger("game-player", 15);
const ACTIONS = {};


// validate the game code and log the player into the game
ACTIONS[PLAYER_LOGIN] = async (state, payload) => {
	let gameCode = payload.gameCode.toUpperCase();

	logger.log("Got game code: " + gameCode);

	// check for the existence of the game before adding the player
	let game = await database.ref(replaceId(STORAGE_KEYS.GAME_ID, gameCode)).once("value").then(snapshot => snapshot.val());

	if(game) {
		logger.log("Creating player", payload.playerName)

		createPlayer(gameCode, payload.playerName);
	}

	return game;
};

// the game state has been changed by the host
ACTIONS[GAME_STATE_CHANGED] = async (state, payload) => {
	logger.log(GAME_STATE_CHANGED, state, payload)

	return { ...state, setup: payload };
};

// the state of the characters has changed, meaning someone has chosen one
ACTIONS[CHARACTER_STATE_CHANGED] = async (state, payload) => {
	logger.log(CHARACTER_STATE_CHANGED, state, payload)

	return { ...state, pcs: payload };
};


export default handlerCreator(ACTIONS);
