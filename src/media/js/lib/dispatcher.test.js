
import "regenerator-runtime/runtime";
import dispatcher from "./dispatcher";

describe("dispatcher: handler registration", () => {
	const handler = jest.fn();
	const ref = dispatcher.register("state", handler);

	test("handler is registered", async () => {
		expect(ref).toBe(1);

		await dispatcher.dispatch("ACTION", 1);

		expect(handler).toBeCalled();
	});

	test("handler is not called when unregistered", async () => {
		const result = dispatcher.unregister("state", ref);

		expect(result).toBeTruthy();

		await dispatcher.dispatch("ACTION", 1);

		expect(handler).toBeCalledTimes(1);
	});
});

describe("dispatcher: subscriber registration", () => {
	test("subscriber is called", async () => {
		const subscriber = jest.fn();
		const ref = dispatcher.subscribe(subscriber);

		await dispatcher.dispatch("ACTION", 1);

		expect(subscriber).toBeCalled();
	});

	test("subscriber is not called when unsubscribed", async () => {
		const subscriber = jest.fn();
		const ref = dispatcher.subscribe(subscriber);

		dispatcher.unsubscribe(ref);

		await dispatcher.dispatch("ACTION", 1);

		expect(subscriber).toBeCalledTimes(0);
	});
});

/*describe("dispatcher: ", () => {
	//const subscriber = jest.fn();

	test("dispatcher: registered action is performed", () => {
		const handler = jest.fn()
	});

});*/
