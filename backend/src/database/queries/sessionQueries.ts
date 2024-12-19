import { pool } from "..";
import { SessionSchema } from "../../schemas/sessionSchema";

export async function dbSessionCreate(
  sessionId: string,
  userId: number
): Promise<SessionSchema> {
  const query =
    "INSERT INTO sessions (id, user_id) VALUES ($1, $2) RETURNING *";
  const values = [sessionId, userId];

  const res = await pool.query(query, values);
  return res.rows[0];
}
