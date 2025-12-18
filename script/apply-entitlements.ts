import postgres from "postgres";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set. Aborting.");
  process.exit(1);
}

const sql = postgres(dbUrl, {
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function main() {
  const ddl = `
  CREATE TABLE IF NOT EXISTS pro_signup_entitlements (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'paid',
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS idx_pro_signup_entitlements_email ON pro_signup_entitlements(email);
  `;
  try {
    console.log("Applying entitlements DDL...");
    await sql.unsafe(ddl);
    console.log("✓ Entitlements DDL applied.");
  } catch (err: any) {
    console.error("✗ Failed to apply entitlements DDL:", err?.message || err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
