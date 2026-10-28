import type { Category, NewCategory } from "../types/category";

// Dynamically get the API URL from the injected config.js file at runtime.
const env = (window as unknown as { __ENV__?: { API_URL?: string } }).__ENV__;
const BASE_URL = env?.API_URL || "http://localhost:3001";
const API_URL = `${BASE_URL}/api/categories`;

export async function fetchCategories(): Promise<Category[]> {
	const res = await fetch(API_URL);
	return res.json();
}

export async function createCategory(category: NewCategory): Promise<Category> {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(category),
	});
	return res.json();
}

export async function updateCategory(
	id: string,
	category: NewCategory,
): Promise<Category> {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(category),
	});
	return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
	await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
