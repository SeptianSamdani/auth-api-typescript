import pool from '../db/index'; 

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  created_at?: Date;
}

export const UserModel = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  },

  async create(user: User): Promise<User> {
    const { name, email, password, role } = user;
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role || 'user']
    );
    return result.rows[0];
  },
};
