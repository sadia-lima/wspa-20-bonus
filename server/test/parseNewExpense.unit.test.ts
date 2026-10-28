import { describe, expect, it } from "vitest";
import { parseNewExpense } from "../src/routes/expense.js";

describe("parseNewExpense", () => {
	it("returns the parsed expense when the body is valid", () => {
		const result = parseNewExpense({
			description: "Coffee",
			amount: 3.5,
			date: "2026-08-10",
		});
		expect(result).toEqual({
			description: "Coffee",
			amount: 3.5,
			date: "2026-08-10",
		});
	});

	it("returns null when amount is missing", () => {
		const result = parseNewExpense({
			description: "Coffee",
			date: "2026-08-10",
		});
		expect(result).toBeNull();
	});

	it("returns null when amount is a string, not a number", () => {
		const result = parseNewExpense({
			description: "Coffee",
			amount: "3.50",
			date: "2026-08-10",
		});
		expect(result).toBeNull();
	});

	it("returns null when date is missing", () => {
		const result = parseNewExpense({
			description: "Coffee",
			amount: 3.5,
		});
		expect(result).toBeNull();
	});
});
