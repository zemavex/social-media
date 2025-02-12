import type { UserAuthDTO } from "~shared/user";
import type { UserRow } from "./types";

export const toUserAuthDTO = (user: UserRow): UserAuthDTO => ({
  id: user.id,
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  role: user.role,
  is_finished_registration: user.is_finished_registration,
});
