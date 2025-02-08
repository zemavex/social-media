import type { UserModel } from "./types";

type PartialUser = Pick<
  UserModel,
  "id" | "username" | "first_name" | "last_name" | "role"
>;

export const toUserDTO = (user: PartialUser): PartialUser => ({
  id: user.id,
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  role: user.role,
});
