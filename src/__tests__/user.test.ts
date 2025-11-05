import request from 'supertest';
import app from '../app';
import { setupTestDB, teardownTestDB } from './helpers/db-helper';
import pool from '../db';

describe('User API', () => {
  let userToken: string;
  let adminToken: string;

  beforeAll(async () => {
  await setupTestDB();

  // Register regular user
  const userRes = await request(app)
  .post('/api/auth/register')
  .send({
    name: 'Regular User',
    email: 'user@test.com',
    password: '123456',
  });
  userToken = userRes.body.token;

  // Register admin dan update role-nya di database
  const adminRes = await request(app)
  .post('/api/auth/register')
  .send({
    name: 'Admin User',
    email: 'admin@test.com',
    password: '123456',
  });

  // Update role ke admin di database
  await pool.query(
  "UPDATE users SET role = 'admin' WHERE email = 'admin@test.com'"
  );

  // Login lagi untuk dapat token dengan role admin
  const adminLoginRes = await request(app)
  .post('/api/auth/login')
  .send({
    email: 'admin@test.com',
    password: '123456',
  });
  adminToken = adminLoginRes.body.token;
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  describe('GET /api/users/profile', () => {
    it('should get user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'User profile');
      expect(res.body).toHaveProperty('user');
    });

    it('should reject request without token', async () => {
      const res = await request(app)
        .get('/api/users/profile');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'No token provided');
    });

    it('should reject request with invalid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid or expired token');
    });
  });

  describe('GET /api/users (Admin Only)', () => {
    it('should allow admin to access', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('should reject regular user', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error', 'Access denied');
    });
  });
});