
import { database } from "../lib/firebase";
import { STORAGE_KEYS } from "../lib/config";
import { replaceId } from "../lib/utils";


// create a new player and return a promise
export const createPlayer = (gameCode, name) => {
	// TODO there should be some sort of session ref here so players can't sign in twice
	// TODO player name should be stored in local storage and retrieved for later use
	let createRef = database.ref(replaceId(STORAGE_KEYS.GAME_PLAYERS, gameCode)).push();

	return createRef.set({
		name: name
	});
};
