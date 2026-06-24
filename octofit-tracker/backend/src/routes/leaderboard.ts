import express, { Request, Response } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = express.Router();

// GET /api/leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('userId')
      .sort({ score: -1 });
    res.json({
      message: 'Competitive leaderboard',
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:id (team or category leaderboard)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entry = await LeaderboardEntry.findById(id).populate('userId');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json({ message: `Leaderboard for ${id}`, leaderboard: [entry] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

export default router;
