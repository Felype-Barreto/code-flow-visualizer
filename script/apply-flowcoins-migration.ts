import postgres from 'postgres';
import { readFileSync } from 'fs';

// Hardcoded connection for migration (change if needed)
const dbUrl = 'postgresql://postgres:felype.BARRETO10@localhost:5432/codeflow';
const sql = postgres(dbUrl);

async function runMigration() {
  try {
    const migration = readFileSync('./migrations/0007_add_flowcoins_system.sql', 'utf-8');
    await sql.unsafe(migration);
    console.log('✅ FlowCoins migration applied successfully!');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
}

runMigration();
