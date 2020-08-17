
import React from "react";
import Button from "../components/common/button";
import dispatcher from "../lib/dispatcher";
import { SIGNED_IN } from "../lib/action-keys";


const onClick = () => {
	dispatcher.dispatch(SIGNED_IN, true);
}

export default (props) => (
	<div>
		<p>You are about to play <strong>{ props.game.name }</strong>.</p>
		<p>The code for the game is <strong>{ props.game.code }</strong>. Tell this to your players now so they can connect to the game. Once they've all connected, use the button below to set up the game.</p>
		{ props.players.length
			? <div className="content">
				<p>The following players have signed in:</p>
				<ul> { props.players.map(p => <li key={ p.internalId }>{ p.name }</li>) }</ul>
			</div>
			: null
		}
		<Button onClick={ onClick } primary fullwidth label="Setup the Game" />
	</div>
);
