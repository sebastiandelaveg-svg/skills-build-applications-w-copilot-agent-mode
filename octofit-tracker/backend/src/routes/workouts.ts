import express, { Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = express.Router();

// GET /api/workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ message: 'List of workout suggestions', workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('userId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Workout ${id}`, workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts (personalized workout suggestions)
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({
      message: 'Personalized workout suggestions generated',
      workout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

export default router;
