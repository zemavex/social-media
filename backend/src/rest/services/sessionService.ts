import { v4 as uuidv4 } from "uuid";
import { dbSessionCreate } from "../../database/queries/sessionQueries";
import { SessionSchema } from "../../schemas/sessionSchema";

export const sessionCreateService = async (
  userId: number
): Promise<SessionSchema> => {
  const sessionId = uuidv4();
  const newSession = await dbSessionCreate(sessionId, userId);
  return newSession;
};
