const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5050;

const users = require('./routes/users');

app.use('/api/v1/users', users);

app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	);
});
