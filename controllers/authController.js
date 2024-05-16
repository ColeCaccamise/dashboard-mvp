import bcrypt from 'bcrypt';
import colors from 'colors';

import Credential from '../model/Credential.js';
import User from '../model/User.js';

import { createUser } from '../services/UserService.js';

import { generateToken } from '../services/AuthService.js';

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

// @desc    register a new user
// @route   POST /api/v1/auth/register
export const register = async (req, res, next) => {
	const { username, password, email } = req.body;

	const missingFields = [];
	const requiredFields = ['name', 'username', 'password', 'email'];

	for (let field of requiredFields) {
		if (!req.body[field]) {
			missingFields.push(field);
		}
	}

	if (missingFields.length > 0) {
		res.status(400).json({
			error: 'Required field(s) are missing.',
			errorType: 'missingFields',
			missingFields,
		});
		return;
	}

	// TODO: validate username/email doesn't already exist

	// hash password
	const saltRounds = 10;
	bcrypt.hash(password, saltRounds, async function (err, hash) {
		if (err) {
			res.status(500).json({ error: 'Failed to hash password.' });
		} else {
			try {
				const user = await createUser(req.body);

				const token = generateToken(user);

				const credential = await Credential.create({
					userId: user._id,
					username: username,
					email: email,
					hashedPassword: hash,
					role: 'user',
				});
				res.cookie('authToken', token, {
					httpOnly: true,
					secure: true,
					maxAge: 604800000, // cookie validity in milliseconds (7d)
				});
				res.json({ message: 'User created successfully.', token, credential });
			} catch (error) {
				console.error('Error creating user: ', error);
				res.status(500).json({ error: 'Failed to create user.' });
				return;
			}
		}
	});
};

// @desc    login a user
// @route   POST /api/v1/auth/login
export const login = async (req, res) => {
	const { username, password, email } = req.body;

	// get user from database with username or email
	const user = await Credential.findOne({ username: username }).exec();

	console.log(user);
	const hash = user?.hashedPassword;

	bcrypt.compare(password, hash, async function (err, result) {
		if (err) {
			res.status(500).json({ error: 'Failed to compare passwords.' });
			return;
		}
		if (result) {
			// create JWT
			const token = generateToken(user);

			// update user's last login
			user.lastLogin = Date.now();
			user.save();

			const userData = await User.findOne({ _id: user.userId }).exec();

			res.json({
				message: 'User logged in successfully.',
				user: userData,
				token,
			});
		} else {
			res.status(401).json({ error: 'Incorrect password.' });
		}
	});
};

// @desc    logout a user
// @route   POST /api/v1/auth/logout
export const logout = (req, res) => {
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
};

// @desc    deny unsupported methods
// @route   *
export const methodNotAllowed = (req, res) => {
	const method = req.method;
	res.status(405).json({
		message: `${method} method not allowed for /api/v1/auth${req.url}`,
	});
};
