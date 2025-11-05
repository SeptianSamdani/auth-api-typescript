import { UserModel } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) throw new Error('Email already registered');

    const hashed = await hashPassword(password);
    const user = await UserModel.create({ name, email, password: hashed });
    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { user, token };
  },
};