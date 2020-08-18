
import React from "react";
import CharacterContainer from "../components/character-container";
import dispatcher from "../lib/dispatcher";
import { CHARACTER_SELECT } from "../lib/action-keys";
import getLogger, { LOG, INFO } from "../lib/logger";

const logger = getLogger("character-select", LOG | INFO);

/*

TODO this screen needs to:

- display a list of characters
- select a character when the player presses the choose button
- disable a character if another player chooses that character

*/

const onSelect = (selected) => {
	logger.info(selected);
	dispatcher.dispatch(CHARACTER_SELECT, selected);
}

export default (props) => <div>{ props.characters.map(m => <CharacterContainer key={ m.internalId } object={ m } onSelect={ onSelect } />) }</div>;
