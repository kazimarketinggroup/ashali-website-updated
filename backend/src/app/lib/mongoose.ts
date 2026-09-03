import mongoose from 'mongoose';
import config from '../config';
import AppError from '../Errors/AppError';

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!config.database_url) {
    throw new AppError(500, 'DATABASE_URL is missing');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(config.database_url, {
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
        socketTimeoutMS: 45000,
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};
