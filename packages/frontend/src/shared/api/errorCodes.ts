export const API_ERROR_CODES = {
  UNKNOWN_ERROR: "unknown_error",
  FORBIDDEN_ERROR: "forbidden_error",
  AUTH_ERROR: "auth_error",
  VALIDATION_FAILED: "validation_failed",
  EMAIL_ALREADY_USED: "email_already_used",
  INVALID_CREDENTIALS: "invalid_credentials",
  GITHUB_ALREADY_CONNECTED: "github_already_connected",
} as const;

export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
