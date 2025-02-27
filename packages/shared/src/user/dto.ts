export type UserRole = "user" | "moderator" | "admin" | "owner";

export interface UserAuthDTO {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  is_finished_registration: boolean;
}

export interface UserProfileDTO {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  last_online: string;
  created_at: string;
}
