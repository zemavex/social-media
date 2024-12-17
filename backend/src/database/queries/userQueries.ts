import { pool } from "..";

interface InsertUserParams {
  login: string;
  password: string;
}

export async function dbUserInsert({ login, password }: InsertUserParams) {
  const query =
    "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *";
  const values = [login, password];

  const res = await pool.query(query, values);
  return res.rows[0];
}
