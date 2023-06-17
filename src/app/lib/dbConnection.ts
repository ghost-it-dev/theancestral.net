import mongoose from 'mongoose';

async function dbConnect() {
	// checks if we have a connection to the database or if it's currently
	// connecting or disconnecting (readyState 1, 2 and 3)
	if (mongoose.connection.readyState !== 0) {
		return;
	}

	// Use new db connection
	return mongoose.connect('mongodb://127.0.0.1:27017/life');
}

export default dbConnect;