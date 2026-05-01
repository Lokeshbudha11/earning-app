import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true, service: "blaster-api" }));

// ---------- Users / me ----------
app.get("/me", async (_req, res) => {
  const me = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!me) return res.status(404).json({ error: "no users seeded" });
  res.json(me);
});

// ---------- Tasks ----------
app.get("/tasks", async (req, res) => {
  const { category } = req.query as { category?: string };
  const tasks = await prisma.task.findMany({
    where: { status: "active", ...(category ? { category } : {}) },
    orderBy: { rewardPoints: "desc" }
  });
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});

const submitSchema = z.object({
  userId: z.string(),
  proofUrl: z.string().url().optional()
});

app.post("/tasks/:id/submit", async (req, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ error: "task not found" });

  // Auto-approve demo flow
  const submission = await prisma.submission.create({
    data: {
      userId: parsed.data.userId,
      taskId: task.id,
      proofUrl: parsed.data.proofUrl,
      status: "approved",
      reviewedAt: new Date()
    }
  });

  await prisma.user.update({
    where: { id: parsed.data.userId },
    data: { pointsBalance: { increment: task.rewardPoints } }
  });
  await prisma.transaction.create({
    data: {
      userId: parsed.data.userId,
      amount: task.rewardPoints,
      unit: "points",
      kind: "earn",
      status: "completed",
      ref: task.title
    }
  });
  await prisma.task.update({
    where: { id: task.id },
    data: { slotsLeft: Math.max(0, task.slotsLeft - 1) }
  });

  res.json({ submission, rewardPoints: task.rewardPoints });
});

// ---------- Wallet ----------
app.get("/wallet/:userId", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.userId } });
  if (!user) return res.status(404).json({ error: "not found" });
  const txs = await prisma.transaction.findMany({
    where: { userId: req.params.userId },
    orderBy: { createdAt: "desc" },
    take: 20
  });
  res.json({ balancePoints: user.pointsBalance, balanceCash: user.cashBalance, transactions: txs });
});

const withdrawSchema = z.object({
  userId: z.string(),
  amount: z.number().int().positive(),
  method: z.enum(["eSewa", "Khalti", "PayPal", "Bank"])
});

app.post("/wallet/withdraw", async (req, res) => {
  const parsed = withdrawSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { userId, amount, method } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: "user not found" });
  if (user.cashBalance < amount) return res.status(400).json({ error: "insufficient cash balance" });

  await prisma.user.update({ where: { id: userId }, data: { cashBalance: { decrement: amount } } });
  const tx = await prisma.transaction.create({
    data: {
      userId,
      amount,
      unit: "NPR",
      kind: "withdraw",
      method,
      status: "pending",
      ref: `${method} withdrawal`
    }
  });
  res.json({ ok: true, transaction: tx });
});

// ---------- Leaderboard ----------
app.get("/leaderboard", async (_req, res) => {
  const rows = await prisma.user.findMany({
    orderBy: { pointsBalance: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      avatar: true,
      pointsBalance: true,
      streak: true,
      tier: true
    }
  });
  res.json(rows);
});

// ---------- Stats / dashboard summary ----------
app.get("/stats", async (_req, res) => {
  const [users, tasks, completed, totalPoints] = await Promise.all([
    prisma.user.count(),
    prisma.task.count(),
    prisma.submission.count({ where: { status: "approved" } }),
    prisma.user.aggregate({ _sum: { pointsBalance: true } })
  ]);
  res.json({
    users,
    tasks,
    completed,
    totalPointsHeld: totalPoints._sum.pointsBalance ?? 0
  });
});

// ---------- Error handler ----------
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`🚀 Blaster API listening on http://localhost:${port}`);
});
