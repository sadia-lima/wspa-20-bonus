import pg from "pg";

const { Pool } = pg;

// Force "db" as host if running inside GitLab CI
const host =
	process.env.PGHOST ||
	process.env.POSTGRES_HOST ||
	(process.env.CI ? "db" : "127.0.0.1");

export const pool = new Pool({
	host,
	port: Number(process.env.PGPORT) || 5432,
	user: process.env.PGUSER || "postgres",
	password: process.env.PGPASSWORD || "password",
	database: process.env.PGDATABASE || "app_test_db",
});
