import "dotenv/config";
import path from "path";
import { pool } from "database";
import { readdirSync, readFileSync } from "fs";

const MIGRATIONS_DIR = path.join(__dirname, "../migrations");

const runMigrations = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const res = await client.query<{ filename: string }>(
      "SELECT filename FROM migrations"
    );
    const appliedMigrations = new Set(res.rows.map((row) => row.filename));

    const migrationFiles = readdirSync(MIGRATIONS_DIR)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of migrationFiles) {
      if (appliedMigrations.has(file)) {
        console.log(`Skipping already applied migration: ${file}`);
        continue;
      }

      const filePath = path.join(MIGRATIONS_DIR, file);
      const query = readFileSync(filePath, "utf8");

      console.log(`Applying migration: ${file}`);
      await client.query(query);
      await client.query("INSERT INTO migrations (filename) VALUES ($1)", [
        file,
      ]);
    }

    await client.query("COMMIT");
    console.log("All migrations applied");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
  } finally {
    client.release();
    await pool.end();
  }
};

void runMigrations();
