import type { RegisterSchema, UserRole } from "~shared/user";
import { pool } from "@/database";
import type { UserRow } from "./types";

async function register(userData: RegisterSchema): Promise<UserRow> {
  const { email, password, firstName, lastName } = userData;

  const query = `
    INSERT INTO users (
      email, 
      password, 
      first_name, 
      last_name, 
      is_registration_finished
    ) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  const values = [email, password, firstName, lastName, true];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0];
}

async function registerUsingGithub(githubId: number): Promise<UserRow> {
  const query = "INSERT INTO users (github_id) VALUES ($1) RETURNING *";
  const values = [githubId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0];
}

async function updateGithubId(
  githubId: number,
  userId: number
): Promise<UserRow | null> {
  const query = "UPDATE users SET github_id = $1 WHERE id = $2 RETURNING *";
  const values = [githubId, userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0] || null;
}

async function findById(userId: number): Promise<UserRow | null> {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0] || null;
}

async function findByEmail(email: string): Promise<UserRow | null> {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0] || null;
}

async function findByGithubId(githubId: number): Promise<UserRow | null> {
  const query = "SELECT * FROM users WHERE github_id = $1";
  const values = [githubId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0] || null;
}

async function findRole(userId: number): Promise<UserRole | null> {
  const query = "SELECT role FROM users WHERE id = $1";
  const values = [userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0]?.role || null;
}

export const User = {
  register,
  registerUsingGithub,
  updateGithubId,
  findById,
  findByEmail,
  findByGithubId,
  findRole,
};
