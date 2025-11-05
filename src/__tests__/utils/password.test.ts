import { hashPassword, comparePassword } from '../../utils/password';

describe('Password Utils', () => {
  it('should hash password correctly', async () => {
    const password = 'test123';
    const hashed = await hashPassword(password);

    expect(hashed).not.toBe(password);
    expect(hashed).toHaveLength(60); // bcrypt hash length
  });

  it('should compare password correctly', async () => {
    const password = 'test123';
    const hashed = await hashPassword(password);

    const isValid = await comparePassword(password, hashed);
    expect(isValid).toBe(true);
  });

  it('should reject wrong password', async () => {
    const password = 'test123';
    const hashed = await hashPassword(password);

    const isValid = await comparePassword('wrongpassword', hashed);
    expect(isValid).toBe(false);
  });
});