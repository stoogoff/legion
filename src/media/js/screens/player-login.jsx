
import React from "react";
import { TextInput } from "../components/common/text";
import Button from "../components/common/button";
import dispatcher from "../lib/dispatcher";
import { PLAYER_LOGIN } from "../lib/action-keys";


export default class PlayerLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameCode: "",
			playerName: ""
		};
	}

	setSimpleState(key, value) {
		this.setState({
			[key]: value
		});
	}

	onClick() {
		dispatcher.dispatch(PLAYER_LOGIN, this.state);
	}

	disableSubmit() {
		return this.state.gameCode === "" || this.state.playerName === "";
	}

	render() {
		return <div>
			<TextInput label="Game Code" value={ this.state.gameCode } onChange={ this.setSimpleState.bind(this, "gameCode") } required={ true } />
			<TextInput label="Player Name" value={ this.state.playerName } onChange={ this.setSimpleState.bind(this, "playerName") } required={ true } />
			<Button onClick={ this.onClick.bind(this) } primary fullwidth label="Sign In" disabled={ this.disableSubmit() } />
		</div>;
	}
}
