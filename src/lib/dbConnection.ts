import env from '@/src/lib/env';
import mongoose from 'mongoose';

async function dbConnect() {
  // checks if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState !== 0) {
    return;
  }

  // Use new db connection
  return await mongoose.connect(env.DB_URI);
}

export default dbConnect;
