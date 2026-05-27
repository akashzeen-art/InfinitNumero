import { RequestHandler, Router } from "express";
import { prisma } from "../lib/prisma";
import { signToken, requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/auth/login — MSISDN-only login, creates user if not exists
router.post("/login", (async (req, res) => {
  const { msisdn } = req.body as { msisdn?: string };

  if (!msisdn || !/^\+?[1-9]\d{6,14}$/.test(msisdn.replace(/\s/g, ""))) {
    return res.status(400).json({ error: "Invalid mobile number" });
  }

  const normalized = msisdn.replace(/\s/g, "");

  const user = await prisma.user.upsert({
    where: { msisdn: normalized },
    update: { lastActive: new Date() },
    create: {
      msisdn: normalized,
      aiProfile: { create: {} },
    },
    include: { aiProfile: true },
  });

  const token = signToken(user.id);
  res.json({ token, user: { id: user.id, msisdn: user.msisdn, aiProfile: user.aiProfile } });
}) as RequestHandler);

// GET /api/auth/me — validate token and return current user
router.get("/me", requireAuth, (async (req, res) => {
  const userId = (req as any).userId as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { aiProfile: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user.id, msisdn: user.msisdn, aiProfile: user.aiProfile });
}) as RequestHandler);

// POST /api/auth/logout — stateless JWT, just signals client to clear token
router.post("/logout", (_req, res) => {
  res.json({ success: true });
});

export default router;
