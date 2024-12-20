import { RequestHandler } from "express";
import { z } from "zod";
import {
  dbSessionFindById,
  dbSessionDelete,
  dbSessionExtend,
} from "@/database/queries/sessionQueries";
import { SESSION_ID_COOKIE_NAME } from "../config/constants";
import { AuthError } from "@/errors/customErrors";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const sessionId = z.string().parse(req.cookies[SESSION_ID_COOKIE_NAME]);

    const session = await dbSessionFindById(sessionId);
    if (!session) {
      res.clearCookie(SESSION_ID_COOKIE_NAME);
      throw new Error("Session not found");
    }

    const sessionTimeLeft = new Date(session.expires_at).getTime() - Date.now();
    if (sessionTimeLeft <= 0) {
      res.clearCookie(SESSION_ID_COOKIE_NAME);
      await dbSessionDelete(sessionId);
      throw new Error("Session expired");
    }

    await dbSessionExtend(sessionId);

    req.session = {
      id: sessionId,
      userId: session.user_id,
    };

    next();
  } catch (err) {
    console.log(err);
    next(AuthError);
  }
};
