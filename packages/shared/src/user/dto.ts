export type UserRole = "user" | "moderator" | "admin" | "owner";

export interface UserAuthDTO {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  is_finished_registration: boolean;
}
