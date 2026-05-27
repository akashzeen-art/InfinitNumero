import { RequestHandler, Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/profile — fetch AI profile for logged-in user
router.get("/", requireAuth, (async (req, res) => {
  const userId = (req as any).userId as string;
  const profile = await prisma.aIProfile.findUnique({ where: { userId } });
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
}) as RequestHandler);

// PUT /api/profile — sync AI profile from client to DB
router.put("/", requireAuth, (async (req, res) => {
  const userId = (req as any).userId as string;
  const { interests, playStyle, totalPlayTime, sessionsCount, recentlyPlayed } = req.body;

  const profile = await prisma.aIProfile.upsert({
    where: { userId },
    update: {
      ...(interests !== undefined && { interests }),
      ...(playStyle !== undefined && { playStyle }),
      ...(totalPlayTime !== undefined && { totalPlayTime }),
      ...(sessionsCount !== undefined && { sessionsCount }),
      ...(recentlyPlayed !== undefined && { recentlyPlayed }),
    },
    create: {
      userId,
      interests: interests ?? {},
      playStyle: playStyle ?? "explorer",
      totalPlayTime: totalPlayTime ?? 0,
      sessionsCount: sessionsCount ?? 0,
      recentlyPlayed: recentlyPlayed ?? [],
    },
  });

  res.json(profile);
}) as RequestHandler);

// POST /api/profile/session — log a single game session
router.post("/session", requireAuth, (async (req, res) => {
  const userId = (req as any).userId as string;
  const { gameName, duration } = req.body as { gameName: string; duration: number };

  if (!gameName || typeof duration !== "number") {
    return res.status(400).json({ error: "gameName and duration required" });
  }

  await prisma.gameSession.create({ data: { userId, gameName, duration } });
  await prisma.user.update({ where: { id: userId }, data: { lastActive: new Date() } });

  res.json({ success: true });
}) as RequestHandler);

export default router;
