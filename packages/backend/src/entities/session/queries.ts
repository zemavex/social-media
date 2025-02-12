import { pool } from "@/database";
import { SESSION } from "@/entities/session";
import { SessionRow } from "./types";

async function create(sessionId: string, userId: number): Promise<SessionRow> {
  const sessionExpiresAt = new Date(Date.now() + SESSION.MAX_AGE);

  const query =
    "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *";
  const values = [sessionId, userId, sessionExpiresAt];

  const res = await pool.query<SessionRow>(query, values);
  return res.rows[0];
}

async function extend(sessionId: string): Promise<void> {
  const sessionExpiresAt = new Date(Date.now() + SESSION.MAX_AGE);

  const query =
    "UPDATE sessions SET expires_at = $1, last_online = NOW() WHERE id = $2";
  const values = [sessionExpiresAt, sessionId];

  await pool.query(query, values);
}

async function deleteSession(sessionId: string): Promise<void> {
  const query = "DELETE FROM sessions WHERE id = $1";
  const values = [sessionId];

  await pool.query(query, values);
}

async function deleteExpired(): Promise<number | null> {
  const query = "DELETE FROM sessions WHERE expires_at < NOW()";

  const res = await pool.query(query);
  return res.rowCount || null;
}

async function findById(sessionId: string): Promise<SessionRow | null> {
  const query = "SELECT * FROM sessions WHERE id = $1";
  const values = [sessionId];

  const res = await pool.query<SessionRow>(query, values);
  return res.rows[0] || null;
}

export const Session = {
  create,
  extend,
  delete: deleteSession,
  deleteExpired,
  findById,
};
