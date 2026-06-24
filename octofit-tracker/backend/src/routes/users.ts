import express, { Request, Response } from 'express';
import { User } from '../models/User';

const router = express.Router();

// GET /api/users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({ message: 'List of users', users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: `User ${id}`, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

export default router;
