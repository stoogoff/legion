
import React from "react";
import GameContainer from "../components/game-container";
import dispatcher from "../lib/dispatcher";
import { GAME_SELECT } from "../lib/action-keys";


const onSelect = (selected) => {
	dispatcher.dispatch(GAME_SELECT, selected);
}

export default (props) => <div>{ props.games.map(m => <GameContainer key={ m.internalId } object={ m } onSelect={ onSelect } />) }</div>;
