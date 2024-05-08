const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5050;

const logger = (req, res, next) => {
	console.log('\n');
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
	console.log('\n');
	next();
};

app.use(logger);

const users = require('./routes/users');
const auth = require('./routes/auth');
const profiles = require('./routes/profiles');
const settings = require('./routes/settings');
const dashboard = require('./routes/dashboard');

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
