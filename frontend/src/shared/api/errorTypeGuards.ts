import axios, { type AxiosError } from "axios";
import type { ZodIssue } from "zod";
import { ERROR_CODES, type ErrorCode } from "./errorCodes";

interface BaseApiErrorData {
  code: ErrorCode;
}

interface ValidationFailedError {
  code: typeof ERROR_CODES.VALIDATION_FAILED;
  issues: ZodIssue[];
}

export const isAxiosError = (
  error: unknown
): error is AxiosError<BaseApiErrorData> => {
  return axios.isAxiosError(error);
};

export const isValidationFailed = (
  error: AxiosError<BaseApiErrorData>
): error is AxiosError<ValidationFailedError> => {
  return error.response?.data.code === ERROR_CODES.VALIDATION_FAILED;
};
