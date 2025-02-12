import { RequestHandler } from "express";
import type { UserRole } from "~shared/user";
import { User } from "@/entities/user";
import { ForbiddenError, UnauthorizedError } from "@/errors";
import { API_ERROR_CODES } from "~shared/core";

const roleHierarchy: { [key in UserRole]: number } = {
  user: 0,
  moderator: 1,
  admin: 2,
  owner: 3,
};

export const checkRoleMiddleware = (minimumRole: UserRole): RequestHandler => {
  return async (req, res, next) => {
    try {
      if (!req.session) throw new UnauthorizedError();

      const userRole = await User.getRole(req.session.userId);
      if (!userRole) throw new Error("User role not found");

      const hasAccess = roleHierarchy[userRole] >= roleHierarchy[minimumRole];
      if (!hasAccess)
        throw new ForbiddenError(API_ERROR_CODES.INSUFFICIENT_ROLE);

      next();
    } catch (err) {
      next(err);
    }
  };
};
