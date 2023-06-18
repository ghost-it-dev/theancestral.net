import mongoose from 'mongoose';
import env from './env';

async function dbConnect() {
	// checks if we have a connection to the database or if it's currently
	// connecting or disconnecting (readyState 1, 2 and 3)
	if (mongoose.connection.readyState !== 0) {
		return;
	}

	// Use new db connection
	return await mongoose.connect(env.DB_URI as string);
}

export default dbConnect;