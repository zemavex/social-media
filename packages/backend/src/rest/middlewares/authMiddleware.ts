import { RequestHandler } from "express";
import { z } from "zod";
import { Session } from "@/entities/session";
import { SESSION } from "@/entities/session/constants";
import { UnauthorizedError } from "@/errors";

const cookieSchema = z.object({
  [SESSION.ID_COOKIE_NAME]: z.string(),
});

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { [SESSION.ID_COOKIE_NAME]: sessionId } = cookieSchema.parse(
      req.cookies
    );

    const foundSession = await Session.findById(sessionId);
    if (!foundSession) {
      res.clearCookie(SESSION.ID_COOKIE_NAME);
      throw new Error("Session not found");
    }

    const sessionTimeLeft =
      new Date(foundSession.expires_at).getTime() - Date.now();
    if (sessionTimeLeft <= 0) {
      res.clearCookie(SESSION.ID_COOKIE_NAME);
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
    next(new UnauthorizedError());
  }
};
