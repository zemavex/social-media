import { RequestHandler } from "express";
import { ForbiddenError, InternalServerError } from "@/errors";
import { User } from "@/entities/user";
import { API_ERROR_CODES } from "~shared/core";

export const checkFinishedRegistrationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);

    const isFinishedRegistration = await User.getIsFinishedRegistration(
      req.session.userId
    );
    if (!isFinishedRegistration)
      throw new ForbiddenError(API_ERROR_CODES.REGISTRATION_INCOMPLETE);

    next();
  } catch (err) {
    next(err);
  }
};
