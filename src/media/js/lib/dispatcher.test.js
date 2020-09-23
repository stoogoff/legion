
import "regenerator-runtime/runtime";
import dispatcher from "./dispatcher";

describe("dispatcher: handler registration", () => {
	const handler = jest.fn();
	const ref = dispatcher.register("state", handler);

	test("handler is registered", () => {
		expect(ref).toBe(1);

		dispatcher.dispatch("ACTION", 1);

		expect(handler).toBeCalled();
	});

	test("handler is not called when unregistered", () => {
		const result = dispatcher.unregister("state", ref);

		expect(result).toBeTruthy();

		dispatcher.dispatch("ACTION", 1);

		expect(handler).toBeCalledTimes(1);
	});
});

describe("dispatcher: subscriber registration", () => {
	test("subscriber is called", () => {
		const subscriber = jest.fn();
		const ref = dispatcher.subscribe(subscriber);

		dispatcher.dispatch("ACTION", 1);

		expect(subscriber).toBeCalled();
	});

	test("subscriber is not called when unsubscribed", () => {
		const subscriber = jest.fn();
		const ref = dispatcher.subscribe(subscriber);

		dispatcher.unsubscribe(ref);

		dispatcher.dispatch("ACTION", 1);

		expect(subscriber).toBeCalledTimes(0);
	});
});

describe("dispatcher: state is correctly modified", () => {
	const ACTION = "ADD";
	const KEY = "number";

	test("registered handler is called with correct arguments", done => {
		const handler = (state, action, payload) => {
			try {
				expect(state).toBeUndefined();
				expect(action).toBe(ACTION);
				expect(payload).toBe(1);

				done();
			}
			catch(error) {
				done(error);
			}

			return state;
		};
		const ref = dispatcher.register(KEY, handler);

		dispatcher.dispatch(ACTION, 1);
		dispatcher.unregister(KEY, ref);
	});

	test("hydrate correctly sets initial state", done => {
		const handler = (state, action, payload) => {
			try {
				expect(state).toBe(0);

				done();
			}
			catch(error) {
				done(error);
			}

			return state;
		};
		const ref = dispatcher.register(KEY, handler);

		dispatcher.hydrate(KEY, 0);
		dispatcher.dispatch(ACTION, 1);
		dispatcher.unregister(KEY, ref);
	});

	test("subscriber receives correctly modified state", async done => {
		const handler = (state, action, payload) => {
			if(action === ACTION) {
				return state + payload;
			}

			return state;
		};

		const subscriber = (action, state) => {
			try {
				expect(action).toBe(ACTION);
				expect(state[KEY]).toBe(1);

				done();
			}
			catch(error) {
				done(error);
			}
		};

		const refHandler = dispatcher.register(KEY, handler);
		const refSubscriber = dispatcher.subscribe(subscriber);

		await dispatcher.dispatch(ACTION, 1);

		dispatcher.unregister(KEY, refHandler);
		dispatcher.unsubscribe(refSubscriber);
	});
});
