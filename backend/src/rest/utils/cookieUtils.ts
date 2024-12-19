import { Response } from "express";
import {
  SESSION_ID_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "../config/constants";

export function setSessionCookie(res: Response, sessionId: string) {
  res.cookie(SESSION_ID_COOKIE_NAME, sessionId, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_MS,
    sameSite: "strict",
  });
}
