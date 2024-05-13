import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config({ path: './config/config.env' });

const uri = process.env.MONGO_URI;

const clientOptions = {
	serverApi: { version: '1', strict: true, deprecationErrors: true },
};

mongoose
	.connect(uri, clientOptions)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('MongoDB connection error: '['red'], err));

const shutdown = (reason, callback) => {
	mongoose.connection.close();
	console.log(`Closing MongoDB connection: ${reason}`);
	callback();
};

// nodemon restarts
process.once('SIGUSR2', () => {
	shutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// For app termination
process.on('SIGINT', () => {
	shutdown('app termination', () => {
		process.exit(0);
	});
});

export default mongoose;
