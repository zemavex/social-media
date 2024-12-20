import { pool } from "..";
import { UserRole, UserSchema } from "@/schemas/userSchema";

interface InsertUserParams {
  login: string;
  password: string;
}

export async function dbUserCreate({
  login,
  password,
}: InsertUserParams): Promise<UserSchema> {
  const query =
    "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *";
  const values = [login, password];

  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function dbUserFindByLogin(
  login: string
): Promise<UserSchema | null> {
  const query = "SELECT * FROM users WHERE login = $1";
  const values = [login];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

export async function dbUserFindById(id: number): Promise<UserSchema | null> {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

export async function dbUserFindRoleByUserId(
  id: number
): Promise<UserRole | null> {
  const query = "SELECT role FROM users WHERE id = $1";
  const values = [id];

  const res = await pool.query(query, values);
  return res.rows[0]?.role || null;
}
