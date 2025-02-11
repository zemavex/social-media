import { API_ERROR_CODES, type ApiErrorCode } from "~shared/core";

export class CustomError extends Error {
  code: ApiErrorCode;
  status: number;

  constructor(code: ApiErrorCode, status: number) {
    super();

    this.code = code;
    this.status = status;

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends CustomError {
  constructor(code: ApiErrorCode) {
    super(code, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(code: ApiErrorCode = API_ERROR_CODES.AUTH_ERROR) {
    super(code, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(code: ApiErrorCode = API_ERROR_CODES.FORBIDDEN_ERROR) {
    super(code, 403);
  }
}

export class ConflictError extends CustomError {
  constructor(code: ApiErrorCode) {
    super(code, 409);
  }
}
