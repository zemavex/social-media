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
      is_finished_registration
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

async function updateFirstName(
  userId: number,
  firstName: UserRow["first_name"]
): Promise<UserRow | null> {
  const query = "UPDATE users SET first_name = $1 WHERE id = $2 RETURNING *";
  const values = [firstName, userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0] || null;
}

async function updateLastName(
  userId: number,
  lastName: UserRow["last_name"]
): Promise<UserRow | null> {
  const query = "UPDATE users SET last_name = $1 WHERE id = $2 RETURNING *";
  const values = [lastName, userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0] || null;
}

async function updateIsFinishedRegistration(
  userId: number,
  isFinishedRegistration: UserRow["is_finished_registration"]
): Promise<UserRow | null> {
  const query =
    "UPDATE users SET is_finished_registration = $1 WHERE id = $2 RETURNING *";
  const values = [isFinishedRegistration, userId];

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

async function getRole(userId: number): Promise<UserRole | null> {
  const query = "SELECT role FROM users WHERE id = $1";
  const values = [userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0]?.role || null;
}

async function getIsFinishedRegistration(
  userId: number
): Promise<boolean | null> {
  const query = "SELECT is_finished_registration FROM users WHERE id = $1";
  const values = [userId];

  const res = await pool.query<UserRow>(query, values);
  return res.rows[0]?.is_finished_registration ?? null;
}

export const User = {
  register,
  registerUsingGithub,
  updateGithubId,
  updateFirstName,
  updateLastName,
  updateIsFinishedRegistration,
  findById,
  findByEmail,
  findByGithubId,
  getRole,
  getIsFinishedRegistration,
};
