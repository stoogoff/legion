
import React from "react";
import GameContainer from "../components/game-container";
import dispatcher from "../lib/dispatcher";
import { GAME_SELECT } from "../lib/action-keys";
import getLogger, { LOG, INFO } from "../lib/logger";

const logger = getLogger("game-select", LOG | INFO);

const onSelected = (selected) => {
	logger.info(selected);
	dispatcher.dispatch(GAME_SELECT, selected);
}

export default (props) => <div>{ props.games.map(m => <GameContainer key={ m.internalId } object={ m } onSelected={ onSelected } />) }</div>;
