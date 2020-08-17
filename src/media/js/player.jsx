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
import playerHandler from "./handlers/player";
import { readyStateChanged } from "./handlers/subscribe";

import { SETUP } from "./lib/config";

// logging
import getLogger from "./lib/logger";

const logger = getLogger("player", 15);



import { PLAYER_LOGIN } from "./lib/action-keys";


class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// data objects from the server
			game: null,
			characters: null,
		};

		this.subscriber = null;
		this.readyStateChanged = null;
	}

	componentDidMount() {
		this.subscriber = dispatcher.subscribe((action, state) => {
			logger.log(action, state);

			// subscribe to changes to the game state in the database
			if(action === PLAYER_LOGIN && state.game) {
				this.readyStateChanged = readyStateChanged(state.game);
			}

			/*if(action === READY_STATE_CHANGED && state.setup === SETUP.STARTED) {
				this.readyStateChanged(); // this unsubscribes
				this.readyStateChanged = null;
			}*/

			// action is PLAYER_LOGIN and game == null, display error
			if(action === PLAYER_LOGIN && state.game === null) {
				logger.error("Game is null")
			}
			else {
				this.setState({
					game: state.game,
					characters: state.game.pcs
				});
			}
		});

		dispatcher.register("game", playerHandler);
		dispatcher.hydrate("game", null);
	}

	render() {
		return <Switch>
			<CharacterSelect characters={ this.state.characters } display={ this.state.game && this.state.game.setup === SETUP.SIGNED_IN } />
			<Loading display={ this.state.game && this.state.game.setup === SETUP.CREATED && this.state.characters != null } />
			<PlayerLogin />
		</Switch>;
	}
}


ReactDOM.render(
	<Player />,
	document.getElementById("container")
);
