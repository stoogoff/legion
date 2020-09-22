
import * as str from "./string";


// id tests
test("id: capital letters become lowercase", () => {
	expect(str.id("ID")).toBe("id");
});

test("id: spaces convert to hyphens", () => {
	expect(str.id("id with a space")).toBe("id-with-a-space");
});

test("id: multiple spaces convert to a single hyphen", () => {
	expect(str.id("multiple    spaces")).toBe("multiple-spaces");
});

test("id: no spaces at the beginning or end", () => {
	expect(str.id("  spaces  ")).toBe("spaces");
});

test("id: accents are removed", () => {
	expect(str.id("áèïóū")).toBe("aeiou");
});

test("id: uppercase accented characters are removed and lowercased", () => {
	expect(str.id("ÁÈÏÓŪ")).toBe("aeiou");
});


// sentenceCase tests
test("sentenceCase: lowercase becomes Titlecase", () => {
	expect(str.sentenceCase("hello")).toBe("Hello");
});

test("sentenceCase: UPPERCASE becomes Titlecase", () => {
	expect(str.sentenceCase("HELLO")).toBe("Hello");
});


// isNumeric tests
test("isNumeric: 6 is a number", () => {
	expect(str.isNumeric(6)).toBeTruthy();
});

test("isNumeric: '6' is a number", () => {
	expect(str.isNumeric("6")).toBeTruthy();
});

test("isNumeric: 'hello' is not a number", () => {
	expect(str.isNumeric("hello")).toBeFalsy();
});


// escapeHTML tests
test("escapeHTML: greater and less than to be converted to HTML entities", () => {
	expect(str.escapeHTML("<span>")).toBe("&lt;span&gt;");
});


// unescapeHTML tests
test("unescapeHTML: &gt; and &lt; to be converted to correct characters", () => {
	expect(str.unescapeHTML("&lt;span&gt;")).toBe("<span>");
});
