import bcrypt from 'bcrypt';
import colors from 'colors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../config/config.env' });

const JWT_SECRET = process.env.JWT_SECRET;

import Credential from '../model/Credential.js';
import User from '../model/User.js';

import { createUser } from '../services/UserService.js';
import { generateToken } from '../services/AuthService.js';
import { createCredentials } from '../services/CredentialService.js';

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

// @desc    verify that JWT is valid, return user data
// @route   GET /api/v1/auth/verify
export const verify = async (req, res, next) => {
	const token = req.cookies.authToken;

	console.log();

	if (!token) {
		res.status(401).json({ error: 'No token provided.' });
		return;
	}

	let decoded;

	try {
		decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findOne({ _id: decoded.userId }).exec();
		console.log(user);
		res.json({ user });
	} catch (error) {
		error.status = 401;
		error.message = 'Invalid token.';
		next(error);
	}
};

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
	const existingEmail = await Credential.findOne({
		email: email,
	}).exec();

	const existingUsername = await Credential.findOne({
		username: username,
	}).exec();

	if (existingEmail && existingUsername) {
		const error = new Error(
			'A user already exists with that email and username.'
		);
		error.status = 400;
		return next(error);
	} else if (existingEmail) {
		const error = new Error('A user already exists with that email.');
		error.status = 400;
		return next(error);
	} else if (existingUsername) {
		const error = new Error('Username is already taken.');
		error.status = 400;
		return next(error);
	}

	try {
		const oldUser = await createUser(req.body);

		const { user, credential } = await createCredentials(
			oldUser,
			username,
			email,
			password
		);

		const token = generateToken(user);

		res.cookie('authToken', token, {
			httpOnly: true,
			secure: true,
			maxAge: 604800000, // cookie validity in milliseconds (7d)
		});

		console.log(
			`user @${credential.username} (${credential.email}) created`.green.bold
		);

		res.json({ message: 'User successfully created.', token, credential });
	} catch (error) {
		next(error);
	}
};

// @desc    login a user
// @route   POST /api/v1/auth/login
export const login = async (req, res, next) => {
	const { username, password, email } = req.body;

	try {
		// get user from database with username or email
		const credential = await Credential.findOne({ username: username }).exec();
		console.log('cred: ', credential);
		const hash = credential?.hashedPassword;

		bcrypt.compare(password, hash, async function (err, result) {
			if (err) {
				res.status(500).json({ error: 'Failed to compare passwords.' });
				return;
			}
			if (result) {
				// create JWT
				const token = generateToken(credential, 'credential');

				// update user's last login
				credential.lastLogin = Date.now();
				credential.save();

				const userData = await User.findOne({ _id: credential.userId }).exec();

				res.cookie('authToken', token, {
					httpOnly: true,
					secure: true,
					maxAge: 604800000, // cookie validity in milliseconds (7d)
				});

				res.json({
					message: 'User logged in successfully.',
					user: userData,
					token,
				});
			} else {
				// TODO log excessive failed login attempts - rate limit ip 5 per 30mins - lock account after 5 for 30 mins

				const error = new Error('Incorrect username or password.');
				return next(error);
			}
		});
	} catch (err) {
		const error = new Error('Account not found.');
		error.status = 404;
		next(error);
	}
};

// @desc    logout a user
// @route   POST /api/v1/auth/logout
export const logout = (req, res) => {
	const token = req.cookies.authToken;

	if (!token) {
		res.status(401).json({ error: 'No token provided.' });
		return;
	}

	const decoded = jwt.verify(token, JWT_SECRET);

	if (!decoded) {
		res.status(401).json({ error: 'Invalid token.' });
		return;
	}

	console.log('logging out decoded: ', decoded);

	const userId = decoded.userId;
	const credentialId = decoded.credentialId;

	const user = User.findOne({ _id: userId }).exec();
	const credential = Credential.findOne({ _id: credentialId }).exec();

	res.clearCookie('authToken');
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
