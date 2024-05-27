import Credential from '../model/Credential.js';

export const getCredentialByUserId = async (userId) => {
	const user = await Credential.findOne({ userId }).exec();

	return user;
};
