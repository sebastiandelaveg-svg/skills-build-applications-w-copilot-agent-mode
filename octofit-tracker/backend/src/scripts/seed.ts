import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    // Create sample users
    console.log('Creating sample users...');
    const users = await User.create([
      {
        name: 'Alice Johnson',
        email: 'alice@octofit.com',
        profilePicture: 'https://i.pravatar.cc/150?u=alice',
      },
      {
        name: 'Bob Smith',
        email: 'bob@octofit.com',
        profilePicture: 'https://i.pravatar.cc/150?u=bob',
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@octofit.com',
        profilePicture: 'https://i.pravatar.cc/150?u=charlie',
      },
      {
        name: 'Diana Wilson',
        email: 'diana@octofit.com',
        profilePicture: 'https://i.pravatar.cc/150?u=diana',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample teams
    console.log('Creating sample teams...');
    const teams = await Team.create([
      {
        name: 'Fitness Enthusiasts',
        description: 'A team dedicated to fitness and health',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Marathon Runners',
        description: 'Team training for marathons',
        members: [users[2]._id, users[3]._id],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create sample activities
    console.log('Creating sample activities...');
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        activityType: 'running',
        duration: 45,
        distance: 7.5,
        calories: 600,
        date: new Date('2024-06-20'),
      },
      {
        userId: users[0]._id,
        activityType: 'cycling',
        duration: 60,
        distance: 25,
        calories: 500,
        date: new Date('2024-06-21'),
      },
      {
        userId: users[1]._id,
        activityType: 'swimming',
        duration: 30,
        distance: 1.5,
        calories: 400,
        date: new Date('2024-06-20'),
      },
      {
        userId: users[2]._id,
        activityType: 'running',
        duration: 90,
        distance: 15,
        calories: 1200,
        date: new Date('2024-06-21'),
      },
      {
        userId: users[3]._id,
        activityType: 'running',
        duration: 45,
        distance: 7,
        calories: 550,
        date: new Date('2024-06-22'),
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create sample leaderboard entries
    console.log('Creating sample leaderboard entries...');
    const leaderboardEntries = await LeaderboardEntry.create([
      {
        userId: users[0]._id,
        score: 1100,
        rank: 1,
        activityCount: 2,
        totalDuration: 105,
        totalDistance: 32.5,
      },
      {
        userId: users[2]._id,
        score: 1200,
        rank: 1,
        activityCount: 1,
        totalDuration: 90,
        totalDistance: 15,
      },
      {
        userId: users[1]._id,
        score: 400,
        rank: 3,
        activityCount: 1,
        totalDuration: 30,
        totalDistance: 1.5,
      },
      {
        userId: users[3]._id,
        score: 550,
        rank: 2,
        activityCount: 1,
        totalDuration: 45,
        totalDistance: 7,
      },
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    console.log('Creating sample workouts...');
    const workouts = await Workout.create([
      {
        userId: users[0]._id,
        title: 'Full Body Strength Training',
        description: 'A comprehensive strength training routine',
        exercises: [
          { name: 'Squats', sets: 4, reps: 10 },
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
        ],
        duration: 60,
        difficulty: 'intermediate',
      },
      {
        userId: users[1]._id,
        title: 'Beginner Yoga Flow',
        description: 'A gentle yoga routine for beginners',
        exercises: [
          { name: 'Sun Salutation', sets: 1, reps: 5, duration: 15 },
          { name: 'Downward Dog', sets: 3, reps: 1, duration: 5 },
          { name: 'Child\'s Pose', sets: 1, reps: 1, duration: 5 },
        ],
        duration: 45,
        difficulty: 'beginner',
      },
      {
        userId: users[2]._id,
        title: 'Advanced HIIT Workout',
        description: 'High intensity interval training',
        exercises: [
          { name: 'Burpees', sets: 5, reps: 10 },
          { name: 'Jump Squats', sets: 5, reps: 15 },
          { name: 'Mountain Climbers', sets: 5, reps: 20 },
        ],
        duration: 30,
        difficulty: 'advanced',
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('✅ Database seeding completed successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
