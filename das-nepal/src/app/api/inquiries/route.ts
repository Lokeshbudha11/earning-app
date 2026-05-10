import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";

const InquirySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(180),
  org: z.string().max(180).optional().default(""),
  topic: z.enum([
    "Smart Farming",
    "Research",
    "Cooperative",
    "Press",
    "Other"
  ]),
  message: z.string().min(4).max(4000)
});

const memory: Array<z.infer<typeof InquirySchema> & { id: string; createdAt: string }> = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const db = getDb();

    if (db) {
      try {
        const created = await db.inquiry.create({ data });
        return NextResponse.json({ ok: true, id: created.id });
      } catch {
        // fall through to in-memory
      }
    }

    const id = `mem_${Date.now().toString(36)}`;
    memory.unshift({ ...data, id, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true, id, mode: "memory" });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 50
      });
      return NextResponse.json({ inquiries: rows });
    } catch {
      // fall through
    }
  }
  return NextResponse.json({ inquiries: memory.slice(0, 50), mode: "memory" });
}
