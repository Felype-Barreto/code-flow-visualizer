export default async function (req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  
  if (req.method !== "POST") {
    res.status(400).end(JSON.stringify({ error: "POST only" }));
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { email, password, firstName, lastName, country, dob } = body;

    if (!email || !password || !firstName || !lastName || !country || !dob) {
      res.status(400).end(JSON.stringify({ error: "Missing required fields" }));
      return;
    }

    // Just validate input format; don't touch DB
    if (!email.includes("@")) {
      res.status(400).end(JSON.stringify({ error: "Invalid email format" }));
      return;
    }

    if (password.length < 8) {
      res.status(400).end(JSON.stringify({ error: "Password must be at least 8 characters" }));
      return;
    }

    res.status(200).end(JSON.stringify({
      ok: true,
      message: "Validation passed. To complete signup, use /api/signup",
      input: { email, firstName, lastName, country, dob }
    }));
  } catch (err: any) {
    res.status(500).end(JSON.stringify({ error: err?.message || String(err) }));
  }
}
