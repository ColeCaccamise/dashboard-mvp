import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../config/config.env' });

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
	const token = jwt.sign(
		{ username: user.username, email: user.email },
		JWT_SECRET,
		{ expiresIn: '7d' }
	);

	return token;
};
