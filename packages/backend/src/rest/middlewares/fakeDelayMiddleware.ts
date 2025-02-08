import { RequestHandler } from "express";

export const fakeDelayMiddleware: RequestHandler = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
};
