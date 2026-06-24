import express, { Request, Response } from 'express';

const router = express.Router();

// GET /api/activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List of activities', activities: [] });
});

// GET /api/activities/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Activity ${id}`, activity: { id } });
});

// POST /api/activities
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Activity logged', activity: req.body });
});

export default router;
