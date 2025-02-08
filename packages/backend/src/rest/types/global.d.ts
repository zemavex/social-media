import "express";

declare global {
  namespace Express {
    interface Request {
      session?: {
        id: string;
        userId: number;
      };
    }
  }
}
