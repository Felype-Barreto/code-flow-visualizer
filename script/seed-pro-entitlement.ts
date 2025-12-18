import postgres from "postgres";
import crypto from "crypto";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set. Aborting.");
  process.exit(1);
}

const email = process.env.PRO_GRANT_EMAIL;
const token = process.env.PRO_GRANT_TOKEN || crypto.randomBytes(16).toString("hex");
const status = process.env.PRO_GRANT_STATUS || "granted"; // 'granted'|'paid'

if (!email) {
  console.error("Set PRO_GRANT_EMAIL to grant an entitlement.");
  process.exit(1);
}

const sql = postgres(dbUrl, {
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function main() {
  try {
    await sql`
      INSERT INTO pro_signup_entitlements (email, token, status)
      VALUES (${email}, ${token}, ${status})
      ON CONFLICT (token) DO NOTHING
    `;
    console.log("✓ Granted entitlement", { email, token, status });
  } catch (err: any) {
    console.error("✗ Failed to grant entitlement:", err?.message || err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
