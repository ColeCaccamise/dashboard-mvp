const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: '../config/config.env' });

const JWT_SECRET = process.env.JWT_SECRET;

const userCredentials = [
	{
		username: 'colecaccamise',
		email: 'cole@dashboard-mvp.com',
		password: 'brody123',
		userId: 1,
		decoded: '',
		lastSignIn: null,
		isSignedIn: false,
	},
	{
		username: 'stevenbartlett',
		email: 'steve@doac.com',
		password: 'web3',
		userId: 2,
		decoded: null,
		lastSignIn: null,
		isSignedIn: false,
	},
];

router.use(express.json()); // not including this resulted in an undefined req.body

router.route('/').all((req, res) => {
	const method = req.method;
	console.log(method);
	res.status(405).json({ message: `${method} method not supported.` }); // Return 405 for unsupported methods
});

/*
	Assume following JSON body format:
	{
		"username": "john_doe",
		"password": "example123",
		"email": "john.doe@example.com"
	}	
*/

router.route('/register').post((req, res) => {
	const { username, password, email, userId } = req.body;

	const missingFields = [];

	if (!username) {
		missingFields.push('username');
	}
	if (!password) {
		missingFields.push('password');
	}
	if (!email) {
		missingFields.push('email');
	}
	if (!userId) {
		missingFields.push('userId');
	}

	if (missingFields.length > 0) {
		res.status(400).json({
			error: 'Required field(s) are missing.',
			errorType: 'missingFields',
			missingFields,
		});
		return;
	}
	// validate username not already taken
	const usernameTaken = userCredentials.some(
		(user) => user.username === username
	);
	if (usernameTaken) {
		res
			.status(409)
			.json({ error: 'Username already taken.', errorType: 'username' });
		return;
	}

	// validate email not already in use
	const emailInUse = userCredentials.some((user) => user.email === email);
	if (emailInUse) {
		res
			.status(409)
			.json({ error: 'Email already in use.', errorType: 'email' });
		return;
	}

	// validate userId not already in use
	const userIdInUse = userCredentials.some((user) => user.userId === userId);
	if (userIdInUse) {
		res
			.status(409)
			.json({ error: 'User ID already in use.', errorType: 'userId' });
		return;
	}

	const token = jwt.sign({ user: 'username' }, process.env.JWT_SECRET);

	let decoded;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: 'Invalid token.' });
		return;
	}

	if (!token) {
		res
			.status(500)
			.json({ error: 'An error occurred while generating a user token.' });
		return;
	}

	console.log(decoded);

	userCredentials.push({ username, password, email, userId, decoded });

	res.json({
		message: 'User registered successfully.',
		user: req.body,
		token: token,
	});
});

router.route('/login').post((req, res) => {
	const { username, password, email } = req.body;
	if (!username && !email) {
		res.status(400).json({ error: 'Username or email required.' });
		return;
	}

	let user;

	if (email) {
		const emailExists = userCredentials.some((user) => user.email == email);
		if (!emailExists) {
			res.status(400).json({ error: 'No user found with that email.' });
			return;
		}
		user = userCredentials.find((user) => user.email == email);
	} else {
		const usernameExists = userCredentials.some(
			(user) => user.username == username
		);
		if (!usernameExists) {
			res.status(400).json({ error: 'No user found with that username.' });
			return;
		}
		user = userCredentials.find((user) => user.username == username);
	}

	if (user.password !== password) {
		res.status(400).json({ error: 'Wrong password.' });
		return;
	}

	user.lastSignIn = new Date();
	user.isSignedIn = true;
	res.json({ message: 'User logged in successfully.', user });
});

router.route('/logout').post((req, res) => {
	const { username, email } = req.body;
	if (!username && !email) {
		res.status(400).json({ error: 'Username or email required.' });
		return;
	}

	let user;

	if (email) {
		const emailExists = userCredentials.some((user) => user.email == email);
		if (!emailExists) {
			res.status(400).json({ error: 'No user found with that email.' });
			return;
		}
		user = userCredentials.find((user) => user.email == email);
	} else {
		const usernameExists = userCredentials.some(
			(user) => user.username == username
		);
		if (!usernameExists) {
			res.status(400).json({ error: 'No user found with that username.' });
			return;
		}
		user = userCredentials.find((user) => user.username == username);
	}

	user.isSignedIn = false;
	res.json({ message: 'User logged out successfully.', user });
});

router.all('*', (req, res) => {
	const method = req.method;
	res.status(405).json({ message: `${method} method not allowed` });
});

module.exports = router;
