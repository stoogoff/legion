
import { createPlayer } from "./create";
import { database } from "../lib/firebase";
import { handlerCreator, replaceId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";
import getLogger from "../lib/logger";

// this file handles the following actions
import {
	PLAYER_LOGIN,
	READY_STATE_CHANGED,
	CHARACTER_SELECT
} from "../lib/action-keys";


const logger = getLogger("playerHandler", 15);
const PLAYER_ACTIONS = {};


// validate the game code and log the player into the game
PLAYER_ACTIONS[PLAYER_LOGIN] = async (state, payload) => {
	let gameCode = payload.gameCode.toUpperCase();

	logger.log("Got game code: " + gameCode);

	// check for the existence of the game before adding the player
	let game = await database.ref(replaceId(STORAGE_KEYS.GAME_ID, gameCode)).once("value").then(snapshot => snapshot.val());

	if(game) {
		createPlayer(gameCode, payload.playerName);
	}

	return game;
};

// the game state has been changed by the host
PLAYER_ACTIONS[READY_STATE_CHANGED] = async (state, payload) => {
	logger.log(state, payload)

	return { setup: payload, ...state };
};

// the player has chosen a character
// TODO this exact functionality will need to be included for both the player and host
PLAYER_ACTIONS[CHARACTER_SELECT] = async (state, payload) => {
	logger.log(state, payload);

	// TODO add the selected character to the current player's profile
	// TODO change the state of the character to selected so no-one else can take it

	return state;
};


export default handlerCreator(PLAYER_ACTIONS);
