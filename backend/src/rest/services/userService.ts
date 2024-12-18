import bcrypt from "bcrypt";
import {
  dbUserCreate,
  dbUserFindByLogin,
} from "../../database/queries/userQueries";
import { UserSchema } from "../../schemas/userSchema";
import { ConflictError, UnauthorizedError } from "../../errors";

export async function userRegistrationService(
  login: string,
  password: string
): Promise<UserSchema> {
  const foundUser = await dbUserFindByLogin(login);
  if (foundUser)
    throw new ConflictError(`User with login "${login}" already exists`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await dbUserCreate({ login, password: hashedPassword });

  return newUser;
}

export async function userLoginService(
  login: string,
  password: string
): Promise<UserSchema> {
  const LoginError = new UnauthorizedError("Invalid login or password");

  const foundUser = await dbUserFindByLogin(login);
  if (!foundUser) throw LoginError;

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) throw LoginError;

  return foundUser;
}
