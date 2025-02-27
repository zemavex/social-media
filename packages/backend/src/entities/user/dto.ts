import type { UserAuthDTO, UserProfileDTO } from "~shared/user";

export const toUserAuthDTO = (user: UserAuthDTO): UserAuthDTO => ({
  id: user.id,
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  role: user.role,
  is_finished_registration: user.is_finished_registration,
});

export const toUserProfileDTO = (user: UserProfileDTO): UserProfileDTO => ({
  id: user.id,
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  last_online: user.last_online,
  created_at: user.created_at,
});
