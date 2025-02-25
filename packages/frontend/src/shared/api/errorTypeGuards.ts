import axios, { type AxiosError } from "axios";
import type { ZodIssue } from "zod";
import { API_ERROR_CODES, type ApiErrorCode } from "~shared/core";

interface BaseApiErrorData {
  code: ApiErrorCode;
}

interface ValidationFailedError {
  code: typeof API_ERROR_CODES.VALIDATION_FAILED;
  issues: ZodIssue[];
}

export const isAxiosError = (
  error: unknown,
): error is AxiosError<BaseApiErrorData> => {
  return axios.isAxiosError(error);
};

export const isValidationFailed = (
  error: AxiosError<BaseApiErrorData>,
): error is AxiosError<ValidationFailedError> => {
  return error.response?.data.code === API_ERROR_CODES.VALIDATION_FAILED;
};
