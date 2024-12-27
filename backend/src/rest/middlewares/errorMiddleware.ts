import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { CustomError } from "@/errors";

export const errorMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", details: err.errors });
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Unknown error" });
};
