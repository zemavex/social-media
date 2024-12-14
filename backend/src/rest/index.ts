import { Application } from "express";
import cors from "cors";

export function initRestApi(app: Application): void {
  app.use(cors());

  app.get("/", (req, res) => {
    res.json({ message: "hello world" });
  });
}
