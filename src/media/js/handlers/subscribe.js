
import { database } from "../lib/firebase";
import dispatcher from "../lib/dispatcher";
import { replaceId } from "../lib/utils";
import { STORAGE_KEYS } from "../lib/config";
import getLogger from "../lib/logger";

// this file handles the following actions
import {
	READY_STATE_CHANGED,
	PLAYER_CONNECTED
} from "../lib/action-keys";


const logger = getLogger("subscribers", 15);


/*

All the functions below are used to subscribe to ongoing events in firebase. They all follow this format:

function() {
	let ref = // get a reference to some firebase path here
	let callback = ref.on("value", ...) // the callback subcribing to updates

	// return a funciton which will unsubscribe from the updates
	return () => {
		if(ref) {
			ref.off("value", callback);
		}
	}
}

Calling code wouuld look something like this:

let unsub = null;

dispatcher.subscribe((action, state) => {
	if(action === PLAYER_LOGIN && state.game) {
		unsub = readyStateChanged(state.game);
	}

	if(action === READY_STATE_CHANGED && state.setup === SETUP.STARTED) {
		unsub(); // unsubscribe from updates
	}
})

*/

// unsubscribe handler
const unsub = (ref, callback) => {
	return () => {
		if(ref) {
			ref.off("value", callback);
		}
	}
};


// the player has logged in, so the game state needs to be watched
export const readyStateChanged = (game) => {
	let ref = database.ref(replaceId(STORAGE_KEYS.GAME_SETUP, game.code));
	let callback = ref.on("value", snapshot => {
		logger.log(READY_STATE_CHANGED, snapshot.val());

		dispatcher.dispatch(READY_STATE_CHANGED, snapshot.val());
	});

	return unsub(ref, callback);
};


// the host has selected a game and now wants to know when the other players sign up
export const playersLoggingIn = (game) => {
	logger.log("playersLoggingIn", game)

	let ref = database.ref(replaceId(STORAGE_KEYS.GAME_PLAYERS, game.code));
	let callback = ref.on("value", snapshot => {
		logger.log(PLAYER_CONNECTED, snapshot.val());

		let players = snapshot.val();

		if(players) {
			// convert players from:
			// { "id1": { name: "Player 1" }, "id2": { name: "Player 2"} }
			// to:
			// [ { internalId: "id1", name: "Player 1"}, { internalId: "id2", name: "Player 2"} ]
			players = Object.keys(players).map(key => {
				return { internalId: key, ...players[key] };
			});

			dispatcher.dispatch(PLAYER_CONNECTED, players);
		}
	});

	return unsub(ref, callback);
};
