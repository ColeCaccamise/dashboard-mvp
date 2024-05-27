import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Credential from '../model/Credential';

import { createUser } from './UserService';

dotenv.config({ path: '../config/config.env' });

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
	const userId = user.userId || user._id;
	const credentialId = user.credentialId || user._id;

	const data = { userId, credentialId };
	const token = jwt.sign(data, JWT_SECRET, {
		expiresIn: '1d',
	});

	return token;
};

export const hashPassword = (password) => {
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

				user.credentialId = credential._id;
				user.save();

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
