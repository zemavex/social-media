import "dotenv/config";
import { pool } from "..";
import { askConfirmation } from "./askConfirmation";

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    github_id INT UNIQUE,
    username VARCHAR(30) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(30) NOT NULL DEFAULT 'user',
    last_name VARCHAR(30),
    role VARCHAR(30) NOT NULL DEFAULT 'user',
    last_online TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const createSessionsTable = `
  CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY,
    user_id INT NOT NULL, 
    expires_at TIMESTAMPTZ NOT NULL,
    last_online TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

const createTables = async () => {
  const confirmed = await askConfirmation("Create tables?");
  if (!confirmed) {
    console.log("Tables creation cancelled.");
    return;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await pool.query(createUsersTable);
    await pool.query(createSessionsTable);

    await client.query("COMMIT");

    console.log("All tables created");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error while creating tables");
    if (err instanceof Error) {
      console.log(err.stack);
    }
  } finally {
    client.release();
    await pool.end();
  }
};

createTables();
