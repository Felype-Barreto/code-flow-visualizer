-- Add monetization fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS free_usage_count INTEGER NOT NULL DEFAULT 10;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ads_watched INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_ad_watched TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS premium_purchases INTEGER NOT NULL DEFAULT 0;

-- Create infinity_pay_purchases table
CREATE TABLE IF NOT EXISTS infinity_pay_purchases (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_id TEXT NOT NULL UNIQUE,
  package_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  status TEXT NOT NULL,
  payment_method TEXT,
  metadata TEXT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create ad_rewards table
CREATE TABLE IF NOT EXISTS ad_rewards (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ad_provider TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  reward_amount INTEGER NOT NULL,
  watched_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_infinity_purchases_user ON infinity_pay_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_infinity_purchases_status ON infinity_pay_purchases(status);
CREATE INDEX IF NOT EXISTS idx_ad_rewards_user ON ad_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_rewards_watched ON ad_rewards(watched_at);
