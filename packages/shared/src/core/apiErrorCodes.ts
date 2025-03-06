export const API_ERROR_CODES = {
  UNKNOWN_ERROR: "unknown_error",
  INTERNAL_SERVER_ERROR: "internal_server_error",
  SESSION_MISSING: "session_missing",
  FORBIDDEN_ERROR: "forbidden_error",
  AUTH_ERROR: "auth_error",
  VALIDATION_FAILED: "validation_failed",
  EMAIL_ALREADY_USED: "email_already_used",
  INVALID_CREDENTIALS: "invalid_credentials",
  GITHUB_CONNECTED_TO_CURRENT_USER: "github_connected_to_current_user",
  GITHUB_CONNECTED_TO_ANOTHER_USER: "github_connected_to_another_user",
  REGISTRATION_INCOMPLETE: "registration_incomplete",
  INSUFFICIENT_ROLE: "insufficient_role",
  INVALID_USER_ID: "invalid_user_id",
  USER_NOT_FOUND: "user_not_found",
  NO_FIELDS_PROVIDED: "no_fields_provided",
} as const;

export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
