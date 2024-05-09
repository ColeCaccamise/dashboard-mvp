import express from 'express';
import dotenv from 'dotenv';

// Import routes
import users from './routes/users.js';
import auth from './routes/auth.js';
import profiles from './routes/profiles.js';
import settings from './routes/settings.js';
// import dashboard from './routes/dashboard.js';

const app = express();

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5050;

const logger = (req, res, next) => {
	console.log('\n');
	console.log('---------------------------------');
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
	next();
	console.log('---------------------------------');
	console.log('\n');
};

app.use(logger);

// router
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/settings', settings);
// app.use('/api/v1/dashboard', dashboard);

app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	);
});
