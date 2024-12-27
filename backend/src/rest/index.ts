import { Application, json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { fakeDelayMiddleware } from "./middlewares/fakeDelayMiddleware";

export function initRestApi(app: Application): void {
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(json());
  app.use(cookieParser());

  app.use(fakeDelayMiddleware);

  app.use("/api", router);

  app.use(errorMiddleware);
}
