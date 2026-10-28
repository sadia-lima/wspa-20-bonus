import { describe, expect, it } from "vitest";
import { parseNewCategory } from "../src/routes/category.js";

describe("parseNewCategory", () => {
	it("returns parsed category when body is valid", () => {
		const result = parseNewCategory({ name: "Food" });
		expect(result).toEqual({ name: "Food" });
	});

	it("returns null when name is missing", () => {
		const result = parseNewCategory({});
		expect(result).toBeNull();
	});

	it("returns null when name is not a string", () => {
		const result = parseNewCategory({ name: 123 });
		expect(result).toBeNull();
	});
});
