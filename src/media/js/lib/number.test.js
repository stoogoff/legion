
import { toByteString } from "./number";

describe("toByteString", () => {
	test("zero bytes", () => {
		const result = toByteString(0);

		expect(result).toBe("0 Bytes");
	});

	test("512 Bytes", () => {
		const result = toByteString(512);

		expect(result).toBe("512 Bytes");
	});

	test("1 KB", () => {
		const result = toByteString(1024);

		expect(result).toBe("1 KB");
	});

	test("1 MB", () => {
		const result = toByteString(1024 * 1024);

		expect(result).toBe("1 MB");
	});

	test("1.5 KB", () => {
		const result = toByteString(1024 + 512);

		expect(result).toBe("1.5 KB");
	});

	test("5 decimal places", () => {
		const result = toByteString(1025, 5);

		expect(result).toBe("1.00098 KB");
	});

	test("3 decimal places", () => {
		const result = toByteString(1025, 3);

		expect(result).toBe("1.001 KB");
	});
});