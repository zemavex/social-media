import bcrypt from "bcrypt";
import {
  dbUserCreate,
  dbUserFindByLogin,
} from "../../database/queries/userQueries";
import { userSchema } from "../../schemas/userSchema";
import { ConflictError } from "../../errors";

const userRegistrationSchema = userSchema.pick({ login: true, password: true });

export async function userRegistrationService(data: unknown) {
  const { login, password } = userRegistrationSchema.parse(data);

  const foundUser = await dbUserFindByLogin(login);
  if (foundUser)
    throw new ConflictError(`User with login "${login}" already exists`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await dbUserCreate({ login, password: hashedPassword });

  return newUser;
}
