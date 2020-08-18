
// storage keys for remote paths
export const STORAGE_KEYS = {
	GAME_ROOT: "/games",
	GAME_ID: "/games/$ID$",
	GAME_SETUP: "/games/$ID$/setup",
	GAME_PLAYERS: "/games/$ID$/players"
};

// the state of the game during the setup process 
export const SETUP = {
	CREATED: "created",                         // the game has been created by the host
	SIGNED_IN: "signed-in",                     // all players have signed in and the host has pressed the Setup button
	CHARACTERS_SELECTED: "characters-selected", // all players have selected characters
	EXTRAS_SELECTED: "extras-selected",         // all players have written about their extras
	STARTED: "started",                         // the host has pressed the Start button
};

export const DEFAULT_HOST_NAME = "You";
