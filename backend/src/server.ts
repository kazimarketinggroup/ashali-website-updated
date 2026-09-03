import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { connectToDatabase } from './app/lib/mongoose';

async function main() {
  try {
    mongoose.set('bufferCommands', false);
    await connectToDatabase();
    console.log('Database connected');

    if (process.env.NODE_ENV !== 'production') {
      app.listen(config.port, () => {
        console.log(`Server running locally on port ${config.port}`);
      });
    }
  } catch (err) {
    console.error('DB connection error:', err);
  }
}

void main();

export default app;
