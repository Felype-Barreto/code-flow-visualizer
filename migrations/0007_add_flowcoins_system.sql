-- Migration: Add FlowCoins system
-- Adds coins field to users, coin transactions table, and coinCost to store purchases

-- Add coins to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS coins INTEGER NOT NULL DEFAULT 0;

-- Create coin_transactions table
CREATE TABLE IF NOT EXISTS coin_transactions (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  source TEXT,
  metadata TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add coinCost to store_purchases
ALTER TABLE store_purchases ADD COLUMN IF NOT EXISTS coin_cost INTEGER NOT NULL DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_coin_transactions_user_id ON coin_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_coin_transactions_created_at ON coin_transactions(created_at DESC);
