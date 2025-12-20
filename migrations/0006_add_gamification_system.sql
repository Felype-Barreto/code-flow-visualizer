-- Migration: Add Gamification System (XP, Badges, Journal, History)
-- Created: 2025-12-19

-- Add gamification columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS level INTEGER NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT 'default';
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'dark';
ALTER TABLE users ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';
ALTER TABLE users ADD COLUMN IF NOT EXISTS daily_streak INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_activity_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS daily_goal INTEGER NOT NULL DEFAULT 3;
ALTER TABLE users ADD COLUMN IF NOT EXISTS total_exercises INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS total_time INTEGER NOT NULL DEFAULT 0;

-- Create activity_history table
CREATE TABLE IF NOT EXISTS activity_history (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  time_spent INTEGER,
  score INTEGER,
  metadata TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_user_id ON activity_history(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_history(created_at DESC);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON user_achievements(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_achievements_unique ON user_achievements(user_id, achievement_id);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL DEFAULT NOW(),
  title TEXT,
  content TEXT NOT NULL,
  tags TEXT,
  exercise_id TEXT,
  code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journal_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_date ON journal_entries(date DESC);

-- Create store_purchases table
CREATE TABLE IF NOT EXISTS store_purchases (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  xp_cost INTEGER NOT NULL,
  purchased_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON store_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_purchased_at ON store_purchases(purchased_at DESC);

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_date TIMESTAMP NOT NULL,
  exercises_completed INTEGER NOT NULL DEFAULT 0,
  goal_met BOOLEAN NOT NULL DEFAULT FALSE,
  xp_bonus INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON daily_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_date ON daily_challenges(challenge_date DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_challenges_user_date ON daily_challenges(user_id, DATE(challenge_date));
