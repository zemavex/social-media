import { pool } from "database";
import { UserModel, UserRole } from "./types";

async function create(userData: {
  email: string;
  password: string;
}): Promise<UserModel> {
  const { email, password } = userData;

  const query =
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
  const values = [email, password];

  const res = await pool.query(query, values);
  return res.rows[0];
}

async function createWithGithub(github_id: number): Promise<UserModel> {
  const query = "INSERT INTO users (github_id) VALUES ($1) RETURNING *";
  const values = [github_id];

  const res = await pool.query(query, values);
  return res.rows[0];
}

async function findById(userId: number): Promise<UserModel | null> {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [userId];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

async function findByEmail(email: string): Promise<UserModel | null> {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

async function findByGithubId(id: number): Promise<UserModel | null> {
  const query = "SELECT * FROM users WHERE github_id = $1";
  const values = [id];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

async function findRole(userId: number): Promise<UserRole | null> {
  const query = "SELECT role FROM users WHERE id = $1";
  const values = [userId];

  const res = await pool.query(query, values);
  return res.rows[0]?.role || null;
}

export const User = {
  create,
  createWithGithub,
  findById,
  findByEmail,
  findByGithubId,
  findRole,
};
