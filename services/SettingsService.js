import Settings from '../model/Settings.js';
import { getUser } from './UserService.js';
import { getCredentialByUserId } from './CredentialService.js';

export const getSettingsByUserId = async (userId) => {
	const settings = await Settings.findOne({ userId }).exec();

	console.log('yo: ', settings);

	return settings;
};

export const getSettings = async (id) => {
	const settings = await Settings.findOne({ _id: id }).exec();

	return settings;
};

export const createSettingsForUser = async (userId) => {
	const user = await getUser(userId);

	const body = {
		userId,
	};

	const credentials = await getCredentialByUserId(userId);

	body['account'] = {};
	body['account']['profile'] = {
		fullName: user.name,
		username: credentials.username,
		email: credentials.email,
	};

	const settings = await Settings.create(body);

	console.log('settings created: ', settings);

	return settings;
};

export const updateSettingsService = async (id, body) => {};
