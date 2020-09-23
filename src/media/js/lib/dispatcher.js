
// simple event dispatcher
let state = {};
let handlers = {};
let subscribers = {};
let ref = 0;
let running = false;
let deferred = [];

const dispatcher = {
	// register a handler for a key in the data set
	register(key, callback) {
		if(!(key in handlers)) {
			handlers[key] = {};
		}

		handlers[key][++ref] = callback;

		return ref;
	},

	// remove a handler from
	unregister(key, ref) {
		if(!handlers[key]) {
			return false;
		}

		delete handlers[key][ref];

		return true;
	},

	hydrate(key, value) {
		state[key] = value;
	},

	// dispatch an action and payload to the relevent handlers
	async dispatch(action, payload) {
		if(running) {
			deferred.push({ action, payload });

			return;
		}

		running = true;

		let newState = { ...state };
		let keys = Object.keys(handlers);

		for(let i = 0, ilen = keys.length; i < ilen; ++i) {
			let key = keys[i];
			let values = Object.values(handlers[key]);

			for(let j = 0, jlen = values.length; j < jlen; ++j) {
				let handler = values[j];

				newState[key] = await handler(newState[key], action, payload);
			}
		}

		state = newState;

		Object.values(subscribers).forEach(callback => callback(action, state));

		running = false;

		while(deferred.length) {
			let next = deferred.shift();

			await dispatcher.dispatch(next.action, next.payload);
		}
	},

	// subscribe to all updates
	subscribe(callback) {
		subscribers[++ref] = callback;

		return ref;
	},

	// remove a subscriber
	unsubscribe(ref) {
		delete subscribers[ref];
	}
};

export default dispatcher;
