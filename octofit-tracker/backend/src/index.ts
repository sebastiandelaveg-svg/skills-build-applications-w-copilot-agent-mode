import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { getAPIBaseURL, logAPIInfo } from './utils/codespaces';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      const apiURL = getAPIBaseURL();
      console.log(`\n🚀 API Server running on ${apiURL}`);
      console.log(`📊 Health check: ${apiURL}/health`);
      console.log(`👥 Users: ${apiURL}/api/users`);
      console.log(`🏃 Activities: ${apiURL}/api/activities`);
      console.log(`\n`);
      logAPIInfo();
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });
