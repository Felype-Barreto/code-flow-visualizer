-- Pro signup entitlements to gate account creation
CREATE TABLE IF NOT EXISTS pro_signup_entitlements (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'paid', -- 'paid' | 'granted' | 'revoked'
  used_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pro_signup_entitlements_email ON pro_signup_entitlements(email);
