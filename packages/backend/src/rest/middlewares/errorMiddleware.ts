import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { API_ERROR_CODES } from "~shared/constants";
import { CustomError } from "@/errors";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  console.error(`\n[${req.method}] ${req.url}`);
  console.error(err.stack);

  if (res.headersSent) return;

  try {
    if (err instanceof ZodError) {
      res
        .status(400)
        .json({ code: API_ERROR_CODES.VALIDATION_FAILED, issues: err.issues });
      return;
    }

    if (err instanceof CustomError) {
      res.status(err.status).json({ code: err.code });
      return;
    }

    res.status(500).json({ code: API_ERROR_CODES.UNKNOWN_ERROR });
  } catch (error) {
    console.error("\nError during error handling");
    console.error(error);

    if (res.headersSent) return;

    res.status(500).json({ code: API_ERROR_CODES.UNKNOWN_ERROR });
  }
};
