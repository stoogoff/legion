
import React from "react";
import GameContainer from "../components/game-container";
import dispatcher from "../lib/dispatcher";
import { GAME_SELECT } from "../lib/action-keys";


const onSelect = (selected) => {
	dispatcher.dispatch(GAME_SELECT, selected);
}

// expected props:
// - games: an array of games to choose
export default (props) => <div>{ props.games.map(m => <GameContainer key={ m.id } object={ m } onSelect={ onSelect } />) }</div>;
