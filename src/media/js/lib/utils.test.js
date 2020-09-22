
import { createId, replaceId } from "./utils";

describe("createId", () => {
	test("createId: id has default length", () => {
		expect(createId()).toHaveLength(6);
	});

	test("createId: id has correct length", () => {
		expect(createId(3)).toHaveLength(3);
	});

	test("createId: id is alphanumeric uppercase", () => {
		expect(createId()).toMatch(/^[A-Z0-9]{6}$/);
	});
});

describe("replaceId", () => {
	test("replaceId: $ID$ string is replaced", () => {
		expect(replaceId("/path/$ID$", "1")).toBe("/path/1");
	});

	test("replaceId: multiple $ID$ strings are replaced", () => {
		expect(replaceId("/path/$ID$/item/$ID$", "1", "2")).toBe("/path/1/item/2");
	});
});
