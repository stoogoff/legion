
// storage keys for remote paths
export const STORAGE_KEYS = {
	GAME_ROOT: "/games",
	GAME_ID: "/games/$ID$",
	GAME_SETUP: "/games/$ID$/setup",
	GAME_PLAYERS: "/games/$ID$/players"
};

// the state of the game during the setup process 
export const SETUP = {
	CREATED: "created",
	SIGNED_IN: "signed-in",
	CHARACTERS_SELECTED: "characters-selected",
	EXTRAS_SELECTED: "extras-selected",
	STARTED: "started",
};
