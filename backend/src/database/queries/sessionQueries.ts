import { pool } from "..";
import { SESSION_MAX_AGE_MS } from "@/rest/config/constants";
import { SessionSchema } from "@/schemas/sessionSchema";

export async function dbSessionCreate(
  sessionId: string,
  userId: number
): Promise<SessionSchema> {
  const sessionExpiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);

  const query =
    "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *";
  const values = [sessionId, userId, sessionExpiresAt];

  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function dbSessionExtend(sessionId: string): Promise<void> {
  const sessionExpiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);

  const query =
    "UPDATE sessions SET expires_at = $1, last_online = NOW() WHERE id = $2";
  const values = [sessionExpiresAt, sessionId];

  await pool.query(query, values);
}

export async function dbSessionDelete(sessionId: string): Promise<void> {
  const query = "DELETE FROM sessions WHERE id = $1";
  const values = [sessionId];

  await pool.query(query, values);
}

export async function dbSessionDeleteExpired(): Promise<number | null> {
  const query = "DELETE FROM sessions WHERE expires_at < NOW()";

  const result = await pool.query(query);
  return result.rowCount;
}

export async function dbSessionFindById(
  sessionId: string
): Promise<SessionSchema | null> {
  const query = "SELECT * FROM sessions WHERE id = $1";
  const values = [sessionId];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}
