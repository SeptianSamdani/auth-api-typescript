import fs from 'fs';
import path from 'path';
import pool from './index';

const migrationsDir = path.join(__dirname, 'migrations');

async function runMigration(file: string) {
  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  await pool.query(sql);
  console.log(`✅ Ran migration: ${file}`);
}

async function migrateUp() {
  try {
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('_up.sql'));
    for (const file of files) await runMigration(file);
    console.log('✅ All migrations applied.');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    pool.end();
  }
}

async function migrateDown() {
  try {
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('_down.sql'));
    for (const file of files) await runMigration(file);
    console.log('🧹 All migrations rolled back.');
  } catch (err) {
    console.error('❌ Rollback failed:', err);
  } finally {
    pool.end();
  }
}

const action = process.argv[2];

if (action === 'up') migrateUp();
else if (action === 'down') migrateDown();
else console.log('Usage: ts-node src/db/migrate.ts [up|down]');
