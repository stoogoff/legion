
import React from "react";
import CharacterContainer from "../components/character-container";
import dispatcher from "../lib/dispatcher";
import { CHARACTER_SELECT } from "../lib/action-keys";
import getLogger, { LOG, INFO } from "../lib/logger";

const logger = getLogger("character-select", LOG | INFO);

/*

TODO this screen needs to:

- DONE display a list of characters
- DONE select a character when the player presses the choose button
- DONE disable a character if another player chooses that character
- DONE disable buttons once a player has chosen their character
- indicate which character the current player has chosen

FOR THE HOST ONLY

once all players have chosen a character (including themselves) they should be able to press a button to
progress to the next stage

*/

const onSelect = (selected) => {
	logger.info(selected);
	dispatcher.dispatch(CHARACTER_SELECT, selected);
}

export default (props) => <div>{ Object.values(props.characters).map(m => <CharacterContainer key={ m.id } player={ props.player } object={ m } onSelect={ onSelect } />) }</div>;
