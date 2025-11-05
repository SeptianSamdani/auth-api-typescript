import { Router } from 'express';
import { authenticate, authorize, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.get('/profile', authenticate, async (req: AuthRequest, res) => {
  res.json({ message: 'User profile', user: req.user });
});

router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  res.json({ message: 'Update profile' });
});

router.get('/', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  res.json({ message: 'All users (admin only)' });
});

export default router;