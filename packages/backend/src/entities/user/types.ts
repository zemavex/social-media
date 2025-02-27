import type { UserRole } from "~shared/user";

export interface UserRow {
  id: number;
  github_id?: number;
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  last_online: string;
  created_at: string;
  is_finished_registration: boolean;
}

export type UserProfile = Pick<
  UserRow,
  "id" | "username" | "first_name" | "last_name" | "last_online" | "created_at"
>;
