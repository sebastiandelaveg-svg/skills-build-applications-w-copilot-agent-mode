import express, { Request, Response } from 'express';

const router = express.Router();

// GET /api/teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List of teams', teams: [] });
});

// GET /api/teams/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Team ${id}`, team: { id } });
});

// POST /api/teams
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Team created', team: req.body });
});

export default router;
