
import { Storage } from "./local-store";

// set up mock methods for those called by storage
const methodNames = ["setItem", "getItem", "length", "key", "removeItem", "clear"];
const mockStorage = {};

methodNames.forEach(mn => mockStorage[mn] = jest.fn());


beforeEach(() => {
	Object.keys(mockStorage).forEach(mn => mockStorage[mn].mockReset());
});



describe("storage.set", () => {
	test("single number value is set correctly", () => {
		const storage = new Storage(mockStorage);
		const input = 1;

		storage.set("number", input);

		expect(mockStorage.setItem).toBeCalledTimes(1);
		expect(mockStorage.setItem.mock.calls[0][0]).toBe("number");
		expect(mockStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(input));
	});

	test("single string value is converted to JSON", () => {
		const storage = new Storage(mockStorage);
		const input = "hello";

		storage.set("string", input);

		expect(mockStorage.setItem).toBeCalledTimes(1);
		expect(mockStorage.setItem.mock.calls[0][0]).toBe("string");
		expect(mockStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(input));
	});

	test("object is converted to JSON", () => {
		const storage = new Storage(mockStorage);
		const input = { string: "hello", number: 1 };

		storage.set("object", input);

		expect(mockStorage.setItem).toBeCalledTimes(1);
		expect(mockStorage.setItem.mock.calls[0][0]).toBe("object");
		expect(mockStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(input));
	});
});

describe("storage.get", () => {
	test("single number is returned correctly", () => {
		const mockReturn = "hello";

		mockStorage.getItem.mockReturnValue(JSON.stringify(mockReturn));

		const storage = new Storage(mockStorage);
		const result = storage.get("number");

		expect(result).toBe(mockReturn);
	});

	test("single string is returned correctly", () => {
		const mockReturn = "hello";

		mockStorage.getItem.mockReturnValue(JSON.stringify(mockReturn));

		const storage = new Storage(mockStorage);
		const result = storage.get("string");

		expect(result).toBe(mockReturn);
	});


	test("object is returned correctly", () => {
		const mockReturn = { string: "hello", number: 1 };

		mockStorage.getItem.mockReturnValue(JSON.stringify(mockReturn));

		const storage = new Storage(mockStorage);
		const result = storage.get("object");

		expect(result).toEqual(mockReturn);
	});

});

describe("storage.has", () => {
	const mockData = { number: 1 };
	const mockImpl = key => mockData[key];

	test("returns true if key exists", () => {
		mockStorage.getItem.mockImplementation(mockImpl);

		const storage = new Storage(mockStorage);
		const result = storage.has("number");

		expect(result).toBeTruthy();
	});

	test("returns false if key doesn't exist", () => {
		mockStorage.getItem.mockImplementation(mockImpl);

		const storage = new Storage(mockStorage);
		const result = storage.has("string");

		expect(result).toBeFalsy();
	});
});
