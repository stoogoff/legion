
import { handlerCreator } from "./base";
import { database } from "../lib/firebase";
import dispatcher from "../lib/dispatcher";
import { PLAYER_LOGIN, GAME_SELECT, READY_STATE_CHANGED, PLAYER_CONNECTED } from "../lib/action-keys";
import { replaceId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";
import getLogger from "../lib/logger";


const logger = getLogger("subscribeHandler", 15);
const SUBSCRIBE_ACTIONS = {};

const subscribers = []; // this may need to be keyed rather than an array so it's easy to unsibscribe


// the player has logged in, so the game state needs to be watched
SUBSCRIBE_ACTIONS[PLAYER_LOGIN] = async (state, payload) => {
	if(state) {
		let ref = database.ref(replaceId(STORAGE_KEYS.GAME_SETUP, state.code));

		subscribers.push(ref);

		ref.on("value", snapshot => {
			dispatcher.dispatch(READY_STATE_CHANGED, snapshot.val());
		});
	}

	return state;
};

SUBSCRIBE_ACTIONS[GAME_SELECT] = async (state, payload) => {
	logger.log(GAME_SELECT, state, payload)

	if(state) {
		let ref = database.ref(replaceId(STORAGE_KEYS.GAME_PLAYERS, state.code));

		subscribers.push(ref);

		ref.on("value", snapshot => {
			logger.log(GAME_SELECT, snapshot.val())

			let players = snapshot.val();

			if(players) {
				players = Object.keys(players).map(key => {
					let obj = players[key];

					obj.internalId = key;

					return obj;
				});

				dispatcher.dispatch(PLAYER_CONNECTED, players);
			}
		});
	}

	return state;
}


export default handlerCreator(SUBSCRIBE_ACTIONS);
