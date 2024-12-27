import { UserRole } from "@/schemas/userSchema";

export interface UserAuthResponse {
  message: string;
  user: {
    id: number;
    login: string;
    role: UserRole;
  };
}
