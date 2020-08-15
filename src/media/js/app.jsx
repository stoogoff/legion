
import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";
import GameSelect from "./routes/game-select";
import CodeGenerated from "./routes/code-generated";
import dispatcher from "./lib/dispatcher";
import gameHandler from "./handlers/game";
import getLogger from "./lib/logger";

const logger = getLogger("app", 15);

const tmpData = [
	{
		id: "1",
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
		id: "2",
		name: "Game Name 2",
		description: "Lorum ipsum dolor sit amet",
		image: "https://via.placeholder.com/100x150"
	}
];


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			game: null
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
	}

	render() {
		return <div>
			{ this.state.game
				? <CodeGenerated game={ this.state.game } />
				: <GameSelect games={ tmpData } />
			}
		</div>;
	}
}





ReactDOM.render(
	<App />,
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