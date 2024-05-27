import Settings from '../model/Settings.js';

export const getSettingsByUserId = async (userId) => {
	const settings = await Settings.findOne({ userId }).exec();

	console.log('yo: ', settings);

	return settings;
};

export const getSettings = async (id) => {
	const settings = await Settings.findOne({ _id: id }).exec();

	return settings;
};

export const createSettingsService = async (body) => {
	const settings = await Settings.create(body);

	return settings;
};

export const updateSettingsService = async (id, body) => {};
