import { notFoundError, existsError } from '../middleware/errors/errors.js';
import { validateBody, validateId } from '../middleware/validation.js';

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
};

function findUser(id, next) {
	const user = userSettings.find((user) => user.userInfo['userId'] == id);
	if (!user) {
		req.errorMessage = `No user settings were found for userId ${id}`;
		req.errorType = 'userSettingsNotFound';
		notFoundError(req, res, next);
	}
	return user;
}

function invalidId(id, next) {
	parsedId = parseInt(id);
	if (isNaN(id)) {
		next({
			status: 400,
			message: 'User settings id must be a number',
		});
	}
	return parsedId;
}

// @desc    Get all user settings
// @route   GET /api/v1/settings
export const getSettings = (req, res) => {
	res.json(userSettings);
};

// @desc    Get user settings by ID
// @route   GET /api/v1/settings/:id
export const getSetting = (req, res, next) => {
	validateId(req, res, next);

	const user = findUser(id, next);

	if (!user) {
		notFoundError(req, res, next);
	}

	res.json(user);
};

// @desc    Create user settings by ID
// @route   POST /api/v1/settings/:id
export const createSettings = (req, res, next) => {
	validateId(req, res, next);
	name, username, email;
	req.requiredFields = ['userInfo: {name, username, email}'];
	validateBody(req, res, next);

	const id = parseInt(req.params.id);

	const userInfoData = req.body['userInfo'];

	const includesUser = userSettings.some(
		(user) => user.userInfo['userId'] === id
	);

	if (includesUser) {
		req.errorMessage = `A user with userId ${req.params.id} already has settings`;
		existsError(req, res, next);
		return;
	}

	// loop over the user info object and check if all required fields are present, discard all others
	const expectedFields = ['name', 'username', 'email'];
	const userInfo = {
		userId: id,
	};

	const missingFields = [];

	for (let field of expectedFields) {
		if (!userInfoData[field]) {
			missingFields.push(field);
		} else {
			userInfo[field] = userInfoData[field];
		}
	}

	if (missingFields.length > 0) {
		res.status(400).json({
			error: `userInfo object is missing required field(s): ${missingFields.join(
				', '
			)}`,
			errorType: 'missingFields',
		});
		return;
	}

	const {
		notificationsEnabled,
		userLanguage,
		userTimezone,
		userCommunicationPreference,
		billing,
	} = req.body;

	const fields = {
		notificationsEnabled,
		userLanguage,
		userTimezone,
		userCommunicationPreference,
		billing,
	};

	const settingFields = {};

	for (let field of Object.keys(fields)) {
		const value = fields[field];
		if (value === undefined) {
			settingFields[field] = defaultValues[field];
		} else {
			settingFields[field] = fields[field];
		}
	}

	userSettings.push({
		userInfo,
		...settingFields,
	});
	res.json(userSettings);
};

// @desc    Update user settings by ID
// @route   PUT /api/v1/settings/:id
export const updateSettings = (req, res, next) => {
	validateId(req, res, next);

	const id = parseInt(req.params.id);

	const user = userSettings.find((user) => user['userInfo']['userId'] === id);

	if (!user) {
		req.errorMessage = `No user profile was found with userId ${id}`;
		req.errorType = 'userSettingsNotFound';
		notFoundError(req, res, next);
	}

	const {
		notificationsEnabled,
		userLanguage,
		userTimezone,
		userCommunicationPreference,
		billing,
		theme,
		userInfo,
	} = req.body;

	const fields = {
		notificationsEnabled,
		userLanguage,
		userTimezone,
		userCommunicationPreference,
		billing,
		theme,
		userInfo,
	};

	const fieldsToUpdate = [];

	for (let field of Object.keys(fields)) {
		const value = fields[field];

		if (value) {
			fieldsToUpdate.push(field);
		}
	}

	for (let field of fieldsToUpdate) {
		if (field == 'userInfo') {
			// name, username, email (ONLY values we want to update)
			const { name, username, email } = fields.userInfo;
			user.userInfo.name = name;
			user.userInfo.username = username;
			user.userInfo.email = email;
		} else {
			user[field] = fields[field];
		}
	}

	res.json(user);
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
	res
		.status(405)
		.json({
			message: `${method} method not allowed for /api/v1/settings${req.url}`,
		});
};
