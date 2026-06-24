import mongoose from 'mongoose';

const DATABASE_NAME = 'octofit_db';
const DEFAULT_MONGO_PORT = 27017;
const DEFAULT_MONGO_HOST = 'localhost';

export const getDatabaseURI = (): string => {
  const mongoURI =
    process.env.MONGO_URI ||
    `mongodb://${DEFAULT_MONGO_HOST}:${DEFAULT_MONGO_PORT}/${DATABASE_NAME}`;
  return mongoURI;
};

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = getDatabaseURI();
    console.log(`Connecting to MongoDB: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log(`✅ Connected to ${DATABASE_NAME} database`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
};
