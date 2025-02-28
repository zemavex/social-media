import type { UserProfileDTO } from "~shared/user";
import { apiInstance } from "@/shared/api";

export const apiFetchUserProfileById = async (
  userId: number,
): Promise<UserProfileDTO> => {
  const res = await apiInstance.get<UserProfileDTO>("/users/id/" + userId);
  return res.data;
};
