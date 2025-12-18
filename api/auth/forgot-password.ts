import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export default async function (req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(400).end(JSON.stringify({ error: "POST only" }));
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      res.status(400).end(JSON.stringify({
        ok: false,
        message: "invalid forgot password data",
        errors: parsed.error.errors.map(e => ({ path: e.path.join("."), message: e.message }))
      }));
      return;
    }

    const { email } = parsed.data;

    // TODO: integrate with storage and email service
    res.status(200).end(JSON.stringify({
      ok: true,
      message: "Password reset code sent to your email (TODO: implement DB + email integration)",
      email
    }));
  } catch (err: any) {
    res.status(500).end(JSON.stringify({
      ok: false,
      error: err?.message || String(err)
    }));
  }
}
