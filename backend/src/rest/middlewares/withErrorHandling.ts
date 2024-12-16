import { RequestHandler } from "express";

export function withErrorHandling(fn: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
