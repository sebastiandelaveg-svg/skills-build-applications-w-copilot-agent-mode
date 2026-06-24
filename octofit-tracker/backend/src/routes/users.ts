import express, { Request, Response } from 'express';

const router = express.Router();

// GET /api/users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List of users', users: [] });
});

// GET /api/users/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id}`, user: { id } });
});

// POST /api/users
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'User created', user: req.body });
});

export default router;
