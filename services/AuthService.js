import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
