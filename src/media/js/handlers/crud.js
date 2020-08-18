
import { database } from "../lib/firebase";
import { STORAGE_KEYS } from "../lib/config";
import { replaceId } from "../lib/utils";
import dispatcher from "../lib/dispatcher";
import getLogger from "../lib/logger";

// this file handles the following actions
import {
	PLAYER_CREATED
} from "../lib/action-keys";


const logger = getLogger("crud", 15);


// create a new player and return a promise
export const createPlayer = (gameCode, name) => {
	logger.log("Creating player", gameCode, name);

	// TODO there should be some sort of session ref here so players can't sign in twice
	// TODO player name should be stored in local storage and retrieved for later use
	let player = {
		code: gameCode,
		name: name
	};
	let createRef = database.ref(replaceId(STORAGE_KEYS.GAME_PLAYERS, gameCode)).push();

	return createRef.set(player).then(() => {
		dispatcher.dispatch(PLAYER_CREATED, { ...player, id: createRef.key });
	});
};

// set a character's selected state to true and add the player id
export const chooseCharacter = (gameCode, characterId, playerId) => {
	logger.log("Assigning character to player");

	return database.ref(replaceId(STORAGE_KEYS.PC_ID, gameCode, characterId)).update({
		selected: true,
		playerId: playerId
	});
};

// update the game's state
export const updateGameState = (gameCode, nextState) => {
	return database.ref(replaceId(STORAGE_KEYS.GAME_SETUP, gameCode)).set(nextState);
};
