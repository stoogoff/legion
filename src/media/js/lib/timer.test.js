
import { after } from "./timer";

describe("after", () => {
	test("wrapped function isn't invoked", () => {
		const inner = jest.fn();
		const wrapped = after(3, inner);

		wrapped();

		expect(inner).not.toBeCalled();
	});

	test("wrapped function is invoked once", () => {
		const inner = jest.fn();
		const wrapped = after(3, inner);

		wrapped();
		wrapped();
		wrapped();
		wrapped();

		expect(inner).toBeCalledTimes(1);
	});

	test("wrapped function passes parameters", () => {
		const inner = jest.fn();
		const wrapped = after(3, inner);

		wrapped("one");
		wrapped("two");
		wrapped("three");

		expect(inner).toBeCalledWith("three");
	});
});