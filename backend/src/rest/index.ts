import { Application, json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";
import { errorMiddleware } from "./middlewares/errorMiddleware";

export function initRestApi(app: Application): void {
  app.use(cors());
  app.use(json());
  app.use(cookieParser());

  app.use("/api", router);

  app.use(errorMiddleware);
}
