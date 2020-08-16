import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";

// screens
import Switch from "./components/switch";
import PlayerLogin from "./screens/player-login";
import CharacterSelect from "./screens/character-select";

// dispatch and data handling code
import dispatcher from "./lib/dispatcher";
import playerHandler from "./handlers/player";

// logging
import getLogger from "./lib/logger";

const logger = getLogger("player", 15);



class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// data objects from the server
			characters: null,
		};
	}

	componentDidMount() {
		this.ref = dispatcher.subscribe((action, state) => {
			logger.log(action, state);

			// action is PLAYER_LOGIN and game == null, display error
			if(state.game === null) {
				logger.error("Game is null")
			}
			else {
				this.setState({
					characters: state.game.pcs
				});
			}
		});

		dispatcher.register("game", playerHandler);

		dispatcher.hydrate("game", null);
	}

	render() {
		return <Switch>
			<CharacterSelect characters={ this.state.characters } display={ this.state.characters != null } />
			<PlayerLogin />
		</Switch>;
	}
}


ReactDOM.render(
	<Player />,
	document.getElementById("container")
);