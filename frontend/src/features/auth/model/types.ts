import { User } from "entities/user";

type PartialUser = Pick<User, "id" | "login" | "role">;

export interface AuthResponse {
  message: string;
  user: PartialUser;
}
