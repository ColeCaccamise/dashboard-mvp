import User from '../model/User.js';

export const createUser = async (body) => {
	const { name } = body;

	const user = await User.create({
		name,
	});

	return user;
};
