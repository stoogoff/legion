
// keys for different actions
// these are exported individually so which actions are used can easily be seen
// at the top of the file


// a game has been chosen
export const GAME_SELECT = "game-select";

// the player has submitted their details
export const PLAYER_LOGIN = "player-login";

// a player has logged in and is connected to the host
export const PLAYER_CONNECTED = "player-connected";

// the current player data has successfully saved to the server
export const PLAYER_CREATED = "player-created";

// the state of the game has updated during setup
export const GAME_STATE_CHANGED = "game-state-changed";

// all players have signed in and the host has pressed the setup button
export const SIGNED_IN = "signed-in";

// all of the players have selected characters and the host is moving to the next stage
export const CHARACTER_SELECTION_COMPLETE = "character-selection-complete";

// a character has been chosen by the current player
export const CHARACTER_SELECT = "character-select";

// a character has been selected by someone else
export const CHARACTER_STATE_CHANGED = "character-state-changed";
