
import * as list from "./list";

describe("sortByProperty", () => {
	const unsorted = [
		{ "string": "aa", number: 1 },
		{ "string": "ab", number: 4 },
		{ "string": "AA", number: 2 },
		{ "string": "Aa", number: 0 },
	];

	test("sorts correctly by string", () => {
		const sorted = unsorted.sort(list.sortByProperty("string"));

		expect(sorted[0].string).toBe("AA");
		expect(sorted[1].string).toBe("Aa");
		expect(sorted[2].string).toBe("aa");
		expect(sorted[3].string).toBe("ab");
	});

	test("sorts correctly by number", () => {
		const sorted = unsorted.sort(list.sortByProperty("number"));

		expect(sorted[0].number).toBe(0);
		expect(sorted[1].number).toBe(1);
		expect(sorted[2].number).toBe(2);
		expect(sorted[3].number).toBe(4);
	});
});

describe("sortByProperties", () => {
	const unsorted = [
		{ "string": "ac", number: 1 },
		{ "string": "ad", number: 0 },
		{ "string": "ab", number: 2 },
		{ "string": "aa", number: 3 },
		{ "string": "ac", number: 5 },
		{ "string": "ab", number: 4 },
		{ "string": "aa", number: 1 },
	];

	test("sorts correctly by multiple properties", () => {
		const sorted = unsorted.sort(list.sortByProperties("string", "number"));

		expect(sorted[0].string).toBe("aa");
		expect(sorted[0].number).toBe(1);
		expect(sorted[1].string).toBe("aa");
		expect(sorted[1].number).toBe(3);

		expect(sorted[2].string).toBe("ab");
		expect(sorted[2].number).toBe(2);
		expect(sorted[3].string).toBe("ab");
		expect(sorted[3].number).toBe(4);
	});

	test("sorts correctly by multiple properties", () => {
		const sorted = unsorted.sort(list.sortByProperties("number", "string"));

		expect(sorted[0].string).toBe("ad");
		expect(sorted[0].number).toBe(0);
		expect(sorted[1].string).toBe("aa");
		expect(sorted[1].number).toBe(1);

		expect(sorted[2].string).toBe("ac");
		expect(sorted[2].number).toBe(1);
		expect(sorted[3].string).toBe("ab");
		expect(sorted[3].number).toBe(2);
	});
});

describe("findByProperty and indexOfByProperty", () => {
	const data = [
		{ "string": "ac", number: 1 },
		{ "string": "ad", number: 0 },
		{ "string": "ab", number: 2 },
		{ "string": "aa", number: 3 },
		{ "string": "ac", number: 5 },
		{ "string": "ab", number: 4 },
		{ "string": "aa", number: 1 },
	];

	test("findByProperty: returns the first object with a matching property", () => {
		const result = data.find(list.findByProperty("string", "ab"));

		expect(result).toBeDefined();
		expect(result.string).toBe("ab");
		expect(result.number).toBe(2);
	});

	test("findByProperty: returns null if a property doesn't match", () => {
		const result = data.find(list.findByProperty("string", "zz"));

		expect(result).toBeUndefined();
	});

	test("findByProperty: returns an array of objects when filtered", () => {
		const result = data.filter(list.findByProperty("string", "aa"));

		expect(result).toHaveLength(2);
		expect(result).toContainEqual(data[3]);
		expect(result).toContainEqual(data[6]);
	});

	test("indexOfByProperty: returns the first index", () => {
		const result = list.indexOfByProperty(data, "string", "aa");

		expect(result).toBe(3);
	});

	test("indexOfByProperty: returns -1 if not found", () => {
		const result = list.indexOfByProperty(data, "string", "ZZ");

		expect(result).toBe(-1);
	});
});

test("unique", () => {
	const data = ["aa", "aa", "ab"];
	const unique = list.unique(data);

	expect(unique).toHaveLength(2);
	expect(unique[0]).toBe("aa");
	expect(unique[1]).toBe("ab");
});
