import Credential from '../model/Credential.js';
import bcrypt from 'bcrypt';

export const getCredentialByUserId = async (userId) => {
	const user = await Credential.findOne({ userId }).exec();

	return user;
};

export const createCredentials = async (user, email, password) => {
	const saltRounds = 10;

	const data = await new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds, async function (err, hash) {
			if (err) {
				const error = new Error('Failed to hash password.');
				error.status = 500;

				reject(error);
			} else {
				try {
					const credential = await Credential.create({
						userId: user._id,
						email: email,
						hashedPassword: hash,
						verified: false,
					});

					user.credentialId = credential._id;
					await user.save();

					resolve({ user: user, credential: credential });
				} catch (err) {
					const error = new Error('Failed to create user.');
					error.serverMessage = err.message;
					error.status = 500;

					reject(error);
				}
			}
		});
	});

	return data;
};
