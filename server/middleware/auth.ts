import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "infinityplay-dev-secret";

export interface AuthRequest extends Express.Request {
  userId?: string;
}

export const requireAuth: RequestHandler = (req, res, next) => {
  const token =
    req.headers.authorization?.replace("Bearer ", "") ??
    (req.headers["x-auth-token"] as string);

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "90d" });
}
