import express, { Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = express.Router();

// GET /api/activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ message: 'List of activities', activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: `Activity ${id}`, activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity logged', activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

export default router;
