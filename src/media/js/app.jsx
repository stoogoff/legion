
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
		image: "https://via.placeholder.com/100x150"
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
