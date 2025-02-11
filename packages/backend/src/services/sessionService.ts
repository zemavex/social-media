import { v4 as uuidv4 } from "uuid";
import { Session, SessionRow } from "@/entities/session";

async function create(userId: number): Promise<SessionRow> {
  const sessionId = uuidv4();
  const newSession = await Session.create(sessionId, userId);
  return newSession;
}

export const sessionService = {
  create,
};
