import { RequestHandler } from "express";

export const fakeDelayMiddleware: RequestHandler = async (req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
};
