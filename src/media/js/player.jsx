import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";

// screens
import Switch from "./components/switch";
import PlayerLogin from "./screens/player-login";
import CharacterSelect from "./screens/character-select";
import Loading from "./screens/loading";

// dispatch and data handling code
import dispatcher from "./lib/dispatcher";
import gamePlayerHandler from "./handlers/game-player";
import playerHandler from "./handlers/player";
import { gameStateChanged, charactersChosen } from "./handlers/subscribe";
import { local } from "./lib/local-store";

import { STORAGE_KEYS, SETUP } from "./lib/config";

// logging
import getLogger from "./lib/logger";

// this file handles the following actions
import {
	GAME_STATE_CHANGED,
	PLAYER_LOGIN,
	PLAYER_CREATED
} from "./lib/action-keys";


const logger = getLogger("app-player", 15);


class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// data objects from the server
			game: null,
			characters: null,
		};

		this.subscriber = null;
		this.gameStateChanged = null;

		// get the username from local storage, if the player has played before
		this.defaultName = local.has(STORAGE_KEYS.PLAYER_LOCAL) ? local.get(STORAGE_KEYS.PLAYER_LOCAL) : "";
	}

	componentDidMount() {
		this.subscriber = dispatcher.subscribe((action, state) => {
			logger.log("Received data", action, state);

			// the current player's info has been created
			// store the name in local storage for reuse
			if(action === PLAYER_CREATED) {
				local.set(STORAGE_KEYS.PLAYER_LOCAL, state.player.name);
			}

			// the current player has logged in to the correct game
			// subscribe to updates to the game's state
			if(action === PLAYER_LOGIN && state.game) {
				this.gameStateChanged = gameStateChanged(state.game);
			}

			// the game state has been changed by the host and everyone has signed in
			// subscribe to updates the characters
			if(action === GAME_STATE_CHANGED && state.game.setup === SETUP.SIGNED_IN) {
				this.charactersChosen = charactersChosen(state.game);
			}

			/*if(action === GAME_STATE_CHANGED && state.setup === SETUP.STARTED) {
				this.gameStateChanged(); // this unsubscribes
				this.gameStateChanged = null;
			}*/

			// action is PLAYER_LOGIN and game == null, display error
			if(action === PLAYER_LOGIN && state.game === null) {
				logger.error("Game is null")
			}
			else {
				this.setState({
					game: state.game,
					player: state.player,
					characters: state.game.pcs
				});
			}
		});

		dispatcher.register("game", gamePlayerHandler);
		dispatcher.register("player", playerHandler);
		dispatcher.hydrate("game", null);
		dispatcher.hydrate("player", null);
	}

	render() {
		return <Switch>
			<CharacterSelect characters={ this.state.characters } player={ this.state.player } display={ this.state.game && this.state.game.setup === SETUP.SIGNED_IN } />
			<Loading display={ this.state.game && this.state.game.setup === SETUP.CREATED && this.state.characters != null } />
			<PlayerLogin defaultName={ this.defaultName } />
		</Switch>;
	}
}


ReactDOM.render(
	<Player />,
	document.getElementById("container")
);
