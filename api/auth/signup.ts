import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, emailVerifications } from "../../shared/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const emailSchema = z.string().email("Invalid email");
const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number");

const signupSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().datetime(),
  country: z.string().min(1).max(100),
  password: strongPassword,
});

export default async function (req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(400).end(JSON.stringify({ error: "POST only" }));
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      res.status(400).end(JSON.stringify({
        ok: false,
        message: "invalid signup data",
        errors: parsed.error.errors.map(e => ({ path: e.path.join("."), message: e.message }))
      }));
      return;
    }

    const { email, firstName, lastName, dateOfBirth, country, password } = parsed.data;

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      res.status(500).end(JSON.stringify({
        ok: false,
        error: "DATABASE_URL not configured on this server"
      }));
      return;
    }

    // Initialize database connection
    const client = postgres(process.env.DATABASE_URL, {
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
    const db = drizzle(client, { schema: { users, emailVerifications } });

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUser.length > 0) {
      res.status(409).end(JSON.stringify({
        ok: false,
        message: "Email already registered"
      }));
      await client.end();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.insert(users).values({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      country,
      emailVerified: false,
    }).returning({ id: users.id, email: users.email });

    // Generate verification code
    const verificationCode = Math.random().toString().slice(2, 8);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await db.insert(emailVerifications).values({
      email,
      code: verificationCode,
      expiresAt,
    }).onConflictDoUpdate({
      target: emailVerifications.email,
      set: {
        code: verificationCode,
        expiresAt,
        attempts: 0,
      }
    });

    // Send verification email via Resend (fire-and-forget)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@codeflowbr.site";
      
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Verify your Code Flow account",
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 15 minutes.</p>`,
      }).catch(err => console.error("[ERROR] Failed to send verification email:", err));
    }

    await client.end();

    res.status(200).end(JSON.stringify({
      ok: true,
      message: "User created! Verification code sent to your email",
      email,
      firstName,
      country
    }));
  } catch (err: any) {
    console.error("[ERROR] /api/auth/signup exception:", err);
    res.status(500).end(JSON.stringify({
      ok: false,
      error: err?.message || String(err)
    }));
  }
}
