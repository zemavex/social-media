import type { UserProfileDTO } from "~shared/user";
import type { UserProfile } from "./types";

export const mapUserProfileDTOToLocal = (
  userProfileDTO: UserProfileDTO,
): UserProfile => ({
  id: userProfileDTO.id,
  username: userProfileDTO.username,
  first_name: userProfileDTO.first_name,
  last_name: userProfileDTO.last_name,
  full_name:
    `${userProfileDTO.first_name || ""} ${userProfileDTO.last_name || ""}`.trim(),
  last_online: userProfileDTO.last_online,
  created_at: userProfileDTO.created_at,
});
