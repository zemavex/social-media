import type { UserRole } from "~shared/user";

export interface User {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  role: UserRole;
}
