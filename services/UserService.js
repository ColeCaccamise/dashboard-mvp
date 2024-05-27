import User from '../model/User.js';

export const createUser = async (body) => {
	const { name } = body;

	const user = await User.create({
		name,
	});

	return user;
};

export const getUser = async (userId) => {
	const user = await User.findOne({ _id: userId }).exec();

	return user;
};
