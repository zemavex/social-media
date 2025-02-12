import { Response } from "express";
import { SESSION } from "@/entities/session";

export function setSessionCookie(res: Response, sessionId: string) {
  res.cookie(SESSION.ID_COOKIE_NAME, sessionId, {
    httpOnly: true,
    maxAge: SESSION.MAX_AGE,
    sameSite: "strict",
  });
}
