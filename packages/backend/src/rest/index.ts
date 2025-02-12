import { Application, json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";
import { middleware } from "./middlewares";

if (!process.env.CLIENT_URL)
  throw new Error("Client url env variable not found");

export function initRestApi(app: Application): void {
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(json());
  app.use(cookieParser());

  // app.use(middleware.fakeDelay);

  app.use("/api", router);

  app.use(middleware.error);
}
