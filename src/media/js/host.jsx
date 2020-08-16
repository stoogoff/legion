
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
import gameHandler from "./handlers/game";

// logging
import getLogger from "./lib/logger";

const logger = getLogger("host", 15);

const tmpData = [
	{
		internalId: "1",
		name: "Game Name 1",
		description: "Lorum ipsum dolor sit amet",
		image: "https://via.placeholder.com/100x150",
		// pcs are required for every game so have them at top level
		pcs: [
			{
				name: "name",
				description: "description",
				image: "https://via.placeholder.com/100x150"
			}
		],
		// there can be any number and type of extras
		// one of each type will be selected and given to each player to add information about
		extras: {
			npcs: [],
			locations: []
		}
	},
	{
		internalId: "2",
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

			// current state within the setup process
			signedIn: false
		};
	}

	componentDidMount() {
		this.ref = dispatcher.subscribe((action, state) => {
			logger.log(action, state);

			this.setState({
				game: state.game
			});
		});

		dispatcher.register("game", gameHandler);

		dispatcher.hydrate("game", null);
	}

	render() {
		return <Switch>
			<CharacterSelect characters={ this.state.characters } display={ this.state.characters != null && this.state.signedIn === true }  />
			<CodeGenerated game={ this.state.game } display={ this.state.game != null } />
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