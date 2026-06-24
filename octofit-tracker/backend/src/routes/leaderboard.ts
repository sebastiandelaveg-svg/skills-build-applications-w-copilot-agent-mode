import express, { Request, Response } from 'express';

const router = express.Router();

// GET /api/leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Competitive leaderboard',
    leaderboard: [
      { rank: 1, user: 'Champion', score: 1000 },
      { rank: 2, user: 'Runner-up', score: 950 },
    ],
  });
});

// GET /api/leaderboard/:id (team or category leaderboard)
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Leaderboard for ${id}`, leaderboard: [] });
});

export default router;
