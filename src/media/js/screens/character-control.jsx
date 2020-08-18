
import React from "react";
import CharacterContainer from "../components/character-container";
import Button from "../components/common/button";
import dispatcher from "../lib/dispatcher";
import { CHARACTER_SELECT, CHARACTER_SELECTION_COMPLETE } from "../lib/action-keys";
import getLogger, { LOG, INFO } from "../lib/logger";

const logger = getLogger("character-select", LOG | INFO);

/*

TODO this screen needs to:

- DONE display a list of characters
- DONE select a character when the player presses the choose button
- DONE disable a character if another player chooses that character
- DONE disable all buttons once a player has chosen their character
- DONE indicate which character the current player has chosen

FOR THE HOST ONLY

once all players have chosen a character (including themselves) they should be able to press a button to
progress to the next stage

the host should be able to deselect characters

*/

const onSelect = (selected) => {
	logger.info(selected);
	dispatcher.dispatch(CHARACTER_SELECT, selected);
}

const onClick = () => {
	dispatcher.dispatch(CHARACTER_SELECTION_COMPLETE, true);
}

// expected props:
// - characters: a hash of characters to display
// - player: the currently logged in player
// - players: an array of all logged in players
export default (props) => {
	let characters = Object.values(props.characters);
	let selectedCharacters = characters.filter(c => c.selected).length;

	logger.log("selectedCharacters", selectedCharacters)

	return <div>
		{ characters.map(
			m => <CharacterContainer key={ m.id } player={ props.player } object={ m } onSelect={ onSelect } />
		) }
		<Button primary fullwidth onClick={ onClick } label="Next" disabled={ selectedCharacters < props.players.length } />
	</div>
};
