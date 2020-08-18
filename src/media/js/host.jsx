
import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";

// screens
import Switch from "./components/switch";
import GameSelect from "./screens/game-select";
import CodeGenerated from "./screens/code-generated";
import CharacterSelect from "./screens/character-select";

// dispatch and data handling code
import dispatcher from "./lib/dispatcher";
import hostHandler from "./handlers/game-host";
import playerHandler from "./handlers/player";
import { playersLoggingIn, charactersChosen } from "./handlers/subscribe";
import { SETUP } from "./lib/config";

// logging
import getLogger from "./lib/logger";

// this file handles the following actions
import {
	GAME_SELECT,
	PLAYER_CONNECTED
} from "./lib/action-keys";


const logger = getLogger("app-host", 15);
const tmpData = [
	{
		id: "game-1",
		name: "Game Name 1",
		description: "Lorum ipsum dolor sit amet",
		image: "https://via.placeholder.com/100x150",
		// pcs are required for every game so have them at top level
		pcs: {
			"pc-1": {
				id: "pc-1",
				name: "Liet Kynes",
				description: "Lorum ipsum dolor sit amet",
				image: "https://via.placeholder.com/100x150",
				selected: false
			},
			"pc-2": {
				id: "pc-2",
				name: "Duncan Idaho",
				description: "Lorum ipsum dolor sit amet",
				image: "https://via.placeholder.com/100x150",
				selected: false
			}
		},
		// there can be any number and type of extras
		// one of each type will be selected and given to each player to add information about
		extras: {
			npcs: [],
			locations: []
		}
	},
	{
		id: "game-2",
		name: "Game Name 2",
		description: "Lorum ipsum dolor sit amet",
		image: "https://via.placeholder.com/100x150"
	}
];


class Host extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// data objects from the server
			game: null,
			characters: null,
			player: null,
			players: [],
		};

		this.subscriber = null;
		this.playersLoggingIn = null;
		this.charactersChosen = null;
	}

	componentDidMount() {
		this.subscriber = dispatcher.subscribe((action, state) => {
			logger.log(action, state);

			// subscribe to players signing in and updates to characters
			// these can be switched off when the game starts
			if(action === GAME_SELECT) {
				this.playersLoggingIn = playersLoggingIn(state.game);
				this.charactersChosen = charactersChosen(state.game);
			}

			// unsubscribe to player updates once the game state has changed to signed in
			/*if(state.game.setup === SETUP.SIGNED_IN) {
				this.playersLoggingIn();
			}*/


			this.setState({
				game: state.game,
				player: state.player,
				characters: state.game ? state.game.pcs : null,
				players: state.players
			});
		});

		dispatcher.register("game", hostHandler); // the game and its setup
		dispatcher.register("player", playerHandler); // the host as a player
		// the other players
		dispatcher.register("players", (state = [], action, payload) => {
			if(action == PLAYER_CONNECTED) {
				return payload;
			}

			return state;
		});

		dispatcher.hydrate("game", null);
		dispatcher.hydrate("player", null);
		dispatcher.hydrate("players", []);
	}

	render() {
		return <Switch>
			<CharacterSelect characters={ this.state.characters } player={ this.state.player } display={ this.state.game && this.state.game.setup === SETUP.SIGNED_IN }  />
			<CodeGenerated game={ this.state.game } players={ this.state.players } display={ this.state.game != null } />
			<GameSelect games={ tmpData } />
		</Switch>;
	}
}


ReactDOM.render(
	<Host />,
	document.getElementById("container")
);



/*async function f() {
	let p = new Promise((resolve, reject) => {
		setTimeout(() => resolve("done"), 1000)
	})

	return await p;
}

f().then(logger.log)*/
/*
import { handlerCreator } from "./handlers/base";


const ACTIONS = {};


ACTIONS["ADD"] = async (state, payload) => {
	let p = new Promise((resolve, reject) => {
		setTimeout(() => resolve(state + payload), 1000)
	})

	return await p;
};
ACTIONS["MINUS"] = async (state, payload) => {
	let p = new Promise((resolve, reject) => {
		setTimeout(() => resolve(state - payload), 1000)
	})

	return await p;
};



dispatcher.register("test", handlerCreator(ACTIONS));
//dispatcher.register("test", minusFunc);
dispatcher.subscribe((action, state) => {
	logger.log(action, state)
})
dispatcher.hydrate("test", 0)
dispatcher.dispatch("ADD", 2).then(() => dispatcher.dispatch("MINUS", 1))
//dispatcher.dispatch("ADD", 3)
//dispatcher.dispatch("TEST", 3)

/*
async function f() {
	return 1;
}

let val = f().then(logger.log)
*/