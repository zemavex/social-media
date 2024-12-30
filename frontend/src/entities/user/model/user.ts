export type UserRole = "user" | "moderator" | "admin" | "owner";

export interface User {
  id: number;
  login: string;
  role: UserRole;
}
