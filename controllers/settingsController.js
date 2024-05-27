import { notFoundError, existsError } from '../middleware/errors/errors.js';
import { validateBody, validateId } from '../middleware/validation.js';
import { getUser } from '../services/UserService.js';
import { getCredentialByUserId } from '../services/CredentialService.js';
import {
	createSettingsService,
	getSettingsByUserId,
} from '../services/SettingsService.js';
import Settings from '../model/Settings.js';

// TODO:
// 1. build out settings API to be an object of form
// {
// 	account: {
// 		profile: {
// 			userId: 1,
// 			fullName: 'Cole Caccamise',
// 			username: 'colecaccamise',
// 			email: 'cole@caccamedia.com'
// 		},
// 		// whatever else
// 	},
// 	billing: {
// 		plan: 'pro',
// 		creditCard: {
// 			lastFour: '4242',
// 			expiration: '12/24'
// 		}
// 	},
// }

const userSettings = [
	{
		userInfo: {
			userId: 1,
			name: 'Cole Caccamise',
			username: 'colecaccamise',
			email: 'cole@dashboard-mvp.com',
		},
		notificationsEnabled: false,
		userLanguage: 'en',
		userTimezone: 'America/New_York',
		userCommunicationPreference: 'email',
		theme: 'dark',
		twoFactorAuthEnabled: false,
		billing: {
			plan: 'pro',
			creditCard: {
				lastFour: '4242',
				expiration: '12/24',
			},
		},
	},
	{
		userInfo: {
			userId: 2,
			name: 'Steven Bartlett',
			username: 'stevenbartlett',
			email: 'steve@doac.com',
		},
		notificationsEnabled: false,
		userLanguage: 'en',
		userTimezone: 'America/New_York',
		userCommunicationPreference: 'email',
		theme: 'dark',
		twoFactorAuthEnabled: false,
		billing: {
			plan: 'free',
			creditCard: null,
		},
	},
];

const defaultValues = {
	account: {
		preferences: {
			theme: {
				interfaceTheme: 'dark',
				availableThemes: ['dark'],
			},
		},
		notifications: {
			methods: {
				email: {
					enabled: false,
				},
			},
		},
		billing: {
			plan: 'free',
			history: [],
		},
	},
};

// @desc    Get all user settings
// @route   GET /api/v1/settings
export const getSettings = (req, res) => {
	res.json(userSettings);
};

// @desc    Get user settings by ID
// @route   GET /api/v1/settings/:id
export const getSetting = async (req, res, next) => {
	console.log('req: ', req.body);
	const settings = await getSettingsByUserId(req.params.id);

	const { group, page } = req.body;

	console.log(group, page);
	console.log(settings);

	if (group && page) {
		const groupSettings = settings[group];
		const pageSettings = groupSettings[page];
		return res.status(200).json({ [page]: pageSettings });
	} else if (group) {
		const groupSettings = settings[group];
		return res.status(200).json({ [group]: groupSettings });
	}

	res.status(200).json({ settings });
};

export const getSettingByGroupAndPage = async (req, res, next) => {
	const { id, group, page } = req.params;
	const settings = await getSettingsByUserId(id);

	console.log(id, group, page);

	if (!settings) {
		req.errorMessage = `No user settings were found for userId ${id}`;
		req.errorType = 'userSettingsNotFound';
		notFoundError(req, res, next);
		return;
	}

	const groupSettings = settings[group];
	const pageSettings = groupSettings[page];

	if (!groupSettings) {
		req.errorMessage = `No group settings were found for userId ${id} and group ${group}`;
		req.errorType = 'groupSettingsNotFound';
		notFoundError(req, res, next);
		return;
	}

	if (!pageSettings) {
		req.errorMessage = `No page settings were found for userId ${id}, group ${group}, and page ${page}`;
		req.errorType = 'pageSettingsNotFound';
		notFoundError(req, res, next);
		return;
	}

	console.log('here?');

	res.status(200).json({ [page]: pageSettings });
};

// @desc    Create user settings for user
// @route   POST /api/v1/settings
// BODY: hash including all settings to create
export const createSettings = async (req, res, next) => {
	const { userId } = req.body;

	const user = await getUser(userId);
	console.log(user);

	const settings = {
		userId,
	};

	// userId: 1,
	// 			fullName: 'Cole Caccamise',
	// 			username: 'colecaccamise',
	// 			email: 'cole@caccamedia.com'

	const credentials = await getCredentialByUserId(userId);

	settings['account'] = {};
	settings['account']['profile'] = {
		fullName: user.name,
		username: credentials.username,
		email: credentials.email,
	};

	const settingsCreated = await createSettingsService(settings);

	res.status(201).json(settingsCreated);
};

// @desc    Update user settings by UserID, Group ID, and Page ID
// @route   PUT /api/v1/settings/:id/:group/:page
export const updateSettingsByGroupAndPage = async (req, res, next) => {
	const { id, group, page } = req.params;
	const { email, username, fullName } = req.body.profile;

	const setting = await Settings.findOne({ userId: id });

	const fields = [];

	if (email) fields.push('email');
	if (username) fields.push('username');
	if (fullName) fields.push('fullName');

	const credential = await getCredentialByUserId(id);

	for (let field of fields) {
		const value = req.body.profile[field];
		setting[group][page][field] = value;
		if (field === 'email' || field === 'username') credential[field] = value;
	}

	setting.updatedAt = Date.now();
	credential.updatedAt = Date.now();

	await setting.save();
	await credential.save();

	// const updatedSettings = await Settings.findOneAndUpdate(
	// 	{ userId: id },
	// 	updated,
	// 	{
	// 		new: true,
	// 		runValidators: true,
	// 	}
	// );

	// res.json(updatedSettings);
	res.json(setting);
};

// @desc    Delete user settings by ID
// @route   DELETE /api/v1/settings/:id
export const deleteSettings = (req, res, next) => {
	validateId(req, res, next);
	const id = parseInt(req.params.id);
	const user = userSettings.find((user) => user.userInfo['userId'] === id);
	if (!user) {
		req.errorMessage = `Cannot delete. No user was found with ID ${id}`;
		req.errorType = 'userSettingsNotFound';
		notFoundError(req, res, next);
	}
	const indexToDelete = userSettings.findIndex((u) => u.userId === user.userId);
	userSettings.splice(indexToDelete, 1);
	res.json(userSettings);
};

// @desc    Deny all other methods
// @route   *
export const methodNotAllowed = (req, res) => {
	const method = req.method;
	res.status(405).json({
		message: `${method} method not allowed for /api/v1/settings${req.url}`,
	});
};
