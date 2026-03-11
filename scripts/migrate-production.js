#!/usr/bin/env node
/**
 * One-time script to apply Prisma migrations to the production database.
 * Run when the Session table (or other tables) are missing in production.
 *
 * Usage (set env vars then run):
 *   Windows: set DATABASE_URL=postgresql://... && set DIRECT_URL=postgresql://... && node scripts/migrate-production.js
 *   Unix:    DATABASE_URL=postgresql://... DIRECT_URL=postgresql://... node scripts/migrate-production.js
 *
 * Or copy production URLs from Vercel (Settings → Environment Variables) into .env.production
 * then: node scripts/migrate-production.js
 */
import { execSync } from "child_process";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Set it to your production database URL.");
  process.exit(1);
}
if (!process.env.DIRECT_URL) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}

try {
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
  console.log("Migrations applied successfully. Session table should now exist.");
} catch (e) {
  process.exit(e.status ?? 1);
}
