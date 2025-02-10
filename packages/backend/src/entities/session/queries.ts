import { pool } from "@/database";
import { SESSION_MAX_AGE_MS } from "@/config/constants";
import { SessionModel } from "./types";

async function create(
  sessionId: string,
  userId: number
): Promise<SessionModel> {
  const sessionExpiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);

  const query =
    "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *";
  const values = [sessionId, userId, sessionExpiresAt];

  const res = await pool.query<SessionModel>(query, values);
  return res.rows[0];
}

async function extend(sessionId: string): Promise<void> {
  const sessionExpiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);

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

async function findById(sessionId: string): Promise<SessionModel | null> {
  const query = "SELECT * FROM sessions WHERE id = $1";
  const values = [sessionId];

  const res = await pool.query<SessionModel>(query, values);
  return res.rows[0] || null;
}

export const Session = {
  create,
  extend,
  delete: deleteSession,
  deleteExpired,
  findById,
};
