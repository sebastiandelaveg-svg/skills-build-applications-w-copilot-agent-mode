import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  activityCount: number;
  totalDuration: number; // in minutes
  totalDistance?: number; // in kilometers
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number },
    activityCount: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    totalDistance: { type: Number },
  },
  { timestamps: true }
);

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardSchema
);
