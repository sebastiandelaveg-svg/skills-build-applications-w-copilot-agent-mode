import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { logAPIInfo, getAPIBaseURL } from './utils/codespaces';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      const apiBaseURL = getAPIBaseURL();
      console.log(`Server running on ${apiBaseURL}`);
      logAPIInfo();
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
