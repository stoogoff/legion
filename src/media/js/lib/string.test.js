
import * as str from "./string";

describe("id", () => {
	test("capital letters become lowercase", () => {
		expect(str.id("ID")).toBe("id");
	});

	test("spaces convert to hyphens", () => {
		expect(str.id("id with a space")).toBe("id-with-a-space");
	});

	test("multiple spaces convert to a single hyphen", () => {
		expect(str.id("multiple    spaces")).toBe("multiple-spaces");
	});

	test("no spaces at the beginning or end", () => {
		expect(str.id("  spaces  ")).toBe("spaces");
	});

	test("accents are removed", () => {
		expect(str.id("áèïóū")).toBe("aeiou");
	});

	test("uppercase accented characters are removed and lowercased", () => {
		expect(str.id("ÁÈÏÓŪ")).toBe("aeiou");
	});
});

describe("sentenceCase", () => {
	test("lowercase becomes Titlecase", () => {
		expect(str.sentenceCase("hello")).toBe("Hello");
	});

	test("UPPERCASE becomes Titlecase", () => {
		expect(str.sentenceCase("HELLO")).toBe("Hello");
	});
});

describe("isNumeric", () => {
	test("6 is a number", () => {
		expect(str.isNumeric(6)).toBeTruthy();
	});

	test("'6' is a number", () => {
		expect(str.isNumeric("6")).toBeTruthy();
	});

	test("'hello' is not a number", () => {
		expect(str.isNumeric("hello")).toBeFalsy();
	});
});

describe("escapeHTML and unescapeHTML", () => {
	test("greater and less than to be converted to HTML entities", () => {
		expect(str.escapeHTML("<span>")).toBe("&lt;span&gt;");
	});

	test("&gt; and &lt; to be converted to correct characters", () => {
		expect(str.unescapeHTML("&lt;span&gt;")).toBe("<span>");
	});
});
