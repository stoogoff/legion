
import React from "react";
import CharacterContainer from "../components/character-container";
import dispatcher from "../lib/dispatcher";
import { CHARACTER_SELECT } from "../lib/action-keys";


const onSelect = (selected) => {
	dispatcher.dispatch(CHARACTER_SELECT, selected);
}

// expected props:
// - characters: a hash of characters to display
// - player: the currently logged in player
export default (props) => (
	<div>
		{ Object.values(props.characters).map(
			m => <CharacterContainer key={ m.id } player={ props.player } object={ m } onSelect={ onSelect } />
		) }
	</div>
);
