import { pool } from "..";

interface InsertUserParams {
  login: string;
  password: string;
}

export async function dbUserCreate({ login, password }: InsertUserParams) {
  const query =
    "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *";
  const values = [login, password];

  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function dbUserFindByLogin(login: string) {
  const query = "SELECT * FROM users WHERE login = $1";
  const values = [login];

  const res = await pool.query(query, values);
  return res.rows[0];
}
