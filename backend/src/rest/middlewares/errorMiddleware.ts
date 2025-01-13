import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { CustomError } from "errors";

export const errorMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    res.status(400).json({ message: "Validation failed", details: err.errors });
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Unknown error" });
};
