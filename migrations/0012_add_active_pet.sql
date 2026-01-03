-- Add active pet field to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS active_pet TEXT;
