import { z } from "zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, emailVerifications } from "../../shared/schema";
import { eq } from "drizzle-orm";

const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
});

export default async function (req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(400).end(JSON.stringify({ error: "POST only" }));
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = verifyCodeSchema.safeParse(body);

    if (!parsed.success) {
      res.status(400).end(JSON.stringify({
        ok: false,
        message: "invalid verification data",
        errors: parsed.error.errors.map(e => ({ path: e.path.join("."), message: e.message }))
      }));
      return;
    }

    const { email, code } = parsed.data;

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      res.status(500).end(JSON.stringify({
        ok: false,
        error: "DATABASE_URL not configured"
      }));
      return;
    }

    const client = postgres(process.env.DATABASE_URL, {
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
    const db = drizzle(client, { schema: { users, emailVerifications } });

    // Find verification record
    const verification = await db.select()
      .from(emailVerifications)
      .where(eq(emailVerifications.email, email))
      .limit(1);

    if (verification.length === 0) {
      res.status(404).end(JSON.stringify({
        ok: false,
        message: "No verification request found for this email"
      }));
      await client.end();
      return;
    }

    const record = verification[0];

    // Check if expired
    if (new Date() > record.expiresAt) {
      res.status(410).end(JSON.stringify({
        ok: false,
        message: "Verification code expired"
      }));
      await client.end();
      return;
    }

    // Check attempts
    if (record.attempts >= 5) {
      res.status(429).end(JSON.stringify({
        ok: false,
        message: "Too many failed attempts. Request a new code."
      }));
      await client.end();
      return;
    }

    // Check code
    if (record.code !== code) {
      // Increment attempts
      await db.update(emailVerifications)
        .set({ attempts: record.attempts + 1 })
        .where(eq(emailVerifications.email, email));

      res.status(400).end(JSON.stringify({
        ok: false,
        message: "Invalid verification code"
      }));
      await client.end();
      return;
    }

    // Code is valid! Mark user as verified
    await db.update(users)
      .set({ emailVerified: true })
      .where(eq(users.email, email));

    // Clean up verification record
    await db.delete(emailVerifications).where(eq(emailVerifications.email, email));

    await client.end();

    res.status(200).end(JSON.stringify({
      ok: true,
      message: "Email verified successfully! You can now log in.",
      email
    }));
  } catch (err: any) {
    console.error("[ERROR] /api/auth/verify-code exception:", err);
    res.status(500).end(JSON.stringify({
      ok: false,
      error: err?.message || String(err)
    }));
  }
}
