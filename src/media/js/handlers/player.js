
// actions in this file relate players of the game making selections and apply to the host
// as well as to the players

import { chooseCharacter } from "./crud";
import { database } from "../lib/firebase";
import { handlerCreator } from "../lib/utils";
import { STORAGE_KEYS, SETUP, DEFAULT_HOST_NAME } from "../lib/config";
import getLogger from "../lib/logger";

// this file handles the following actions
import {
	PLAYER_CREATED,
	CHARACTER_SELECT
} from "../lib/action-keys";


const logger = getLogger("player", 15);
const ACTIONS = {};


// this player has been created on the server and we've got their data
ACTIONS[PLAYER_CREATED] = async (state, payload) => {
	logger.log(PLAYER_CREATED, state, payload);

	return payload;
};

// the player has chosen a character
// TODO this exact functionality will need to be included for both the player and host
ACTIONS[CHARACTER_SELECT] = async (state, payload) => {
	logger.log(CHARACTER_SELECT, state, payload);

	// TODO add the selected character to the current player's profile

	// TODO change the state of the character to selected so no-one else can take it
	chooseCharacter(state.code, payload.id, state.id);


	return { ...state, character: payload };
};


export default handlerCreator(ACTIONS);
