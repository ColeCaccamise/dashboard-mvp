import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// import middleware
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';

// Import routes
import users from './routes/users.js';
import auth from './routes/auth.js';
import profiles from './routes/profiles.js';
import settings from './routes/settings.js';
// import dashboard from './routes/dashboard.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5050;

app.use(logger);

// router
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/settings', settings);
// app.use('/api/v1/dashboard', dashboard);

app.use('*', (req, res, next) => {
	const err = new Error(`Resource not found at ${req.originalUrl}`);
	err.status = 404;
	err.errorType = 'notFound';
	next(err);
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	);
});
