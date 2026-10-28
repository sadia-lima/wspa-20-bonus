import { expect, test } from "@playwright/test";

test("a user can add an expense and see it in the list", async ({ page }) => {
	await page.goto("/");

	await page.getByPlaceholder("Description").fill("Coffee");
	await page.getByPlaceholder("Amount (€)").fill("3.50");
	await page.getByPlaceholder("dd.mm.yyyy").fill("10.08.2026");
	await page.getByRole("button", { name: "Add" }).click();

	await expect(page.getByText("Coffee").first()).toBeVisible();
});

test("a user can edit an expense without locator collisions", async ({
	page,
}) => {
	await page.goto("/");

	// Target the Coffee row
	const row = page.getByRole("listitem").filter({ hasText: "Coffee" }).first();
	await row.getByRole("button", { name: "Edit" }).click();

	// Scope to the item currently showing the Save button
	const editRow = page.getByRole("listitem").filter({
		has: page.getByRole("button", { name: "Save" }),
	});

	// Fill the amount input within that row
	await editRow.locator('input[type="number"]').fill("4.50");
	await editRow.getByRole("button", { name: "Save" }).click();

	// After saving, assert on the updated row text
	await expect(row).toContainText("4.50");
});

test("a user can switch views and add a category", async ({ page }) => {
	await page.goto("/");

	// Switch to categories view
	await page.getByRole("button", { name: "Categories" }).click();

	await page.getByPlaceholder("Category name").fill("Utilities");
	await page.getByRole("button", { name: "Add" }).click();

	await expect(page.getByText("Utilities").first()).toBeVisible();
});
