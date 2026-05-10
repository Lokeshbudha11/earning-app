import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __dasPrisma__: PrismaClient | undefined;
}

let prisma: PrismaClient | null = null;

export function getDb(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!global.__dasPrisma__) {
    try {
      global.__dasPrisma__ = new PrismaClient();
    } catch {
      return null;
    }
  }
  prisma = global.__dasPrisma__;
  return prisma;
}
