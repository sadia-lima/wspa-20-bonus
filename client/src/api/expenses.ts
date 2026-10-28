import type { Expense, NewExpense } from "../types/expense";

// Dynamically get the API URL from the injected config.js file at runtime.
const env = (window as unknown as { __ENV__?: { API_URL?: string } }).__ENV__;
const BASE_URL = env?.API_URL || "http://localhost:3001";
const API_URL = `${BASE_URL}/api/expenses`;

export async function fetchExpenses(): Promise<Expense[]> {
	const res = await fetch(API_URL);
	return res.json();
}

export async function createExpense(expense: NewExpense): Promise<Expense> {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expense),
	});
	return res.json();
}

export async function updateExpense(
	id: string,
	expense: NewExpense,
): Promise<Expense> {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expense),
	});
	return res.json();
}

export async function deleteExpense(id: string): Promise<void> {
	await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
