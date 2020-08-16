
import { handlerCreator } from "./base";
import { database } from "../lib/firebase";
import { PLAYER_LOGIN } from "../lib/action-keys";
import { replaceId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";
import getLogger from "../lib/logger";


const logger = getLogger("playerHandler", 15);
const PLAYER_ACTIONS = {};


// validate the game code and log the player into the game
PLAYER_ACTIONS[PLAYER_LOGIN] = async (state, payload) => {
	let gameCode = payload.gameCode.toUpperCase();

	logger.log("Got game code: " + gameCode);

	// check for the existence of the game before adding the player
	let game = await database.ref(replaceId(STORAGE_KEYS.GAME_ID, gameCode)).once("value").then(snapshot => snapshot.val());

	if(game) {
		let createRef = database.ref(replaceId(STORAGE_KEYS.GAME_PLAYERS, gameCode)).push();

		createRef.set({
			name: payload.playerName
		});	
	}

	return game;
};


export default handlerCreator(PLAYER_ACTIONS);
