
import React from "react";
import GameContainer from "../components/game-container";
import dispatcher from "../lib/dispatcher";
import { GAME_SELECT } from "../lib/action-keys";

import getLogger, { LOG, INFO } from "../lib/logger";

const logger = getLogger("router", LOG | INFO);



const onClick = (game) => {
	logger.info(game);
	dispatcher.dispatch(GAME_SELECT, game);
}


export default (props) => <div>{ props.games.map(m => <GameContainer key={ m.id } game={ m } onClick={ onClick } />) }</div>;
