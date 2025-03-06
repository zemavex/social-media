import type {
  UpdateProfileSchema,
  UserAuthDTO,
  UserProfileDTO,
} from "~shared/user";
import { apiInstance } from "@/shared/api";

export const apiFetchUserProfileById = async (
  userId: number,
): Promise<UserProfileDTO> => {
  const res = await apiInstance.get<UserProfileDTO>("/users/id/" + userId);
  return res.data;
};

export const apiUpdateProfile = async (
  updateRows: UpdateProfileSchema,
): Promise<UserAuthDTO> => {
  const res = await apiInstance.post<UserAuthDTO>(
    "/users/update-profile",
    updateRows,
  );
  return res.data;
};
