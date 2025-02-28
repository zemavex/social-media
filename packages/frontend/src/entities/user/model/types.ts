import type { UserRole } from "~shared/user";

export interface User {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  is_finished_registration: boolean;
}

export interface UserProfile {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  full_name: string;
  last_online: string;
  created_at: string;
}
