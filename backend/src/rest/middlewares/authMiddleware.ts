import { RequestHandler } from "express";
import { z } from "zod";
import { Session } from "entities/session";
import { SESSION_ID_COOKIE_NAME } from "config/constants";
import { AuthError } from "errors";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const sessionId = z.string().parse(req.cookies[SESSION_ID_COOKIE_NAME]);

    const foundSession = await Session.findById(sessionId);
    if (!foundSession) {
      res.clearCookie(SESSION_ID_COOKIE_NAME);
      throw new Error("Session not found");
    }

    const sessionTimeLeft =
      new Date(foundSession.expires_at).getTime() - Date.now();
    if (sessionTimeLeft <= 0) {
      res.clearCookie(SESSION_ID_COOKIE_NAME);
      await Session.delete(sessionId);
      throw new Error("Session expired");
    }

    await Session.extend(sessionId);

    req.session = {
      id: sessionId,
      userId: foundSession.user_id,
    };

    next();
  } catch (err) {
    console.error(err);
    next(AuthError);
  }
};
