import { User, type UserProfile } from "@/entities/user";

async function getProfileById(userId: number): Promise<UserProfile | null> {
  const userProfile = await User.getProfile({ id: userId });
  return userProfile;
}

export const userService = {
  getProfileById,
};
