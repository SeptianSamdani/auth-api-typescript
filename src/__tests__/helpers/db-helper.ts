import pool from '../../db/index';

export const setupTestDB = async () => {
  // Bersihkan database sebelum test
  await pool.query('DELETE FROM users');
};

export const teardownTestDB = async () => {
  // Bersihkan setelah semua test selesai
  await pool.query('DELETE FROM users');
  await pool.end();
};