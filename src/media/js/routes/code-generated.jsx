
import React from "react";
import Button from "../components/common/button";


export default (props) => (
	<div>
		<p>You are about to play <strong>{ props.game.name }</strong>.</p>
		<p>The code for the game is <strong>xxxx</strong>. Tell this to your players now so they can connect to the game. Once they've all connected, use the button below to set up the game.</p>
		<Button fullwidth label="Setup the Game" />
	</div>
);
