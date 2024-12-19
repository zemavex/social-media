import "dotenv/config";
import { pool } from "..";
import { askConfirmation } from "./askConfirmation";

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createSessionsTable = `
  CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY,
    user_id INT NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_online TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

const createTables = async () => {
  const confirmed = await askConfirmation("Create tables?");
  if (!confirmed) {
    console.log("Tables creation cancelled.");
    return;
  }

  try {
    await pool.query(createUsersTable);
    await pool.query(createSessionsTable);

    console.log("All tables created");
  } catch (err) {
    console.error("Error while creating tables");
    if (err instanceof Error) {
      console.log(err.stack);
    }
  } finally {
    await pool.end();
  }
};

createTables();
