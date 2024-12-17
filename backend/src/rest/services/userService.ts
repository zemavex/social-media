import { z } from "zod";
import {
  userLoginValidation,
  userPasswordValidation,
} from "../../validations/userValidation";
import { dbUserInsert } from "../../database/queries/userQueries";

const userRegistrationSchema = z.object({
  login: userLoginValidation,
  password: userPasswordValidation,
});

export async function userRegistrationService(data: unknown) {
  const validatedData = userRegistrationSchema.parse(data);

  const user = await dbUserInsert(validatedData);

  return user;
}
