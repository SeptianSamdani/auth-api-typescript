import { generateToken, verifyToken } from '../../utils/jwt';

describe('JWT Utils', () => {
  it('should generate valid token', () => {
    const payload = { id: 1, email: 'test@example.com' };
    const token = generateToken(payload);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should verify valid token', () => {
    const payload = { id: 1, email: 'test@example.com' };
    const token = generateToken(payload);

    const decoded = verifyToken(token);
    expect(decoded).toHaveProperty('id', 1);
    expect(decoded).toHaveProperty('email', 'test@example.com');
  });

  it('should reject invalid token', () => {
    expect(() => {
      verifyToken('invalid-token');
    }).toThrow();
  });
});