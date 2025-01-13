import { RequestHandler } from "express";
import { User, UserRole } from "entities/user";
import { AuthError, ForbiddenError } from "errors";

const roleHierarchy: { [key in UserRole]: number } = {
  user: 0,
  moderator: 1,
  admin: 2,
  owner: 3,
};

export const checkRoleMiddleware = (minimumRole: UserRole): RequestHandler => {
  return async (req, res, next) => {
    try {
      if (!req.session) throw AuthError;

      const userRole = await User.findRole(req.session.userId);
      if (!userRole) throw new Error("User role not found");

      const hasAccess = roleHierarchy[userRole] >= roleHierarchy[minimumRole];
      if (!hasAccess)
        throw new ForbiddenError(
          "You don't have permission to access this resource"
        );

      next();
    } catch (err) {
      next(err);
    }
  };
};
