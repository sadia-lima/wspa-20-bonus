import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db/pool.js";

beforeEach(async () => {
	await pool.query("DELETE FROM categories");
	await pool.query(`
    INSERT INTO categories (name) VALUES
      ('Groceries'),
      ('Transport')
  `);
});

afterAll(async () => {
	await pool.end();
});

describe("GET /api/categories", () => {
	it("returns the seeded list", async () => {
		const res = await request(app).get("/api/categories");
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
	});
});

describe("POST /api/categories", () => {
	it("returns 201 and the created category with an id", async () => {
		const res = await request(app)
			.post("/api/categories")
			.send({ name: "Entertainment" });

		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({ name: "Entertainment" });
		expect(res.body.id).toBeDefined();
	});

	it("returns 400 when no name is provided", async () => {
		const res = await request(app).post("/api/categories").send({});
		expect(res.status).toBe(400);
	});
});

describe("DELETE /api/categories/:id", () => {
	it("returns 404 with a non-existent id", async () => {
		const res = await request(app).delete(
			"/api/categories/00000000-0000-0000-0000-000000000000",
		);
		expect(res.status).toBe(404);
	});
});
