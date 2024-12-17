import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", details: err.errors });
    return;
  }

  res.status(500).json({ error: "Unknown error" });
};
