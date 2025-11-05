import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const result = await AuthService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', ...result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json({ message: 'Login success', ...result });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};
