import { Application } from "express";
import cors from "cors";
import { pool } from "../database";

export function initRestApi(app: Application): void {
  app.use(cors());

  app.get("/", async (req, res) => {
    const queryRes = await pool.query("SELECT $1::text as name", ["brianc"]);
    console.log(queryRes);
    res.json({ message: "hello world" });
  });
}
