export interface UserModel {
  id: number;
  github_id?: number;
  username?: string;
  email?: string;
  password?: string;
  first_name: string;
  last_name?: string;
  role: "user" | "moderator" | "admin" | "owner";
  last_online: string;
  created_at: string;
}

export type UserRole = UserModel["role"];
