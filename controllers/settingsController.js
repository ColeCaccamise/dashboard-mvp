import { notFoundError, existsError } from '../middleware/errors/errors.js';
import { validateBody, validateId } from '../middleware/validation.js';
import { getUser } from '../services/UserService.js';
import { getCredentialByUserId } from '../services/CredentialService.js';
import {
	createSettingsForUser,
	getSettingsByUserId,
} from '../services/SettingsService.js';
import Settings from '../model/Settings.js';
import User from '../model/User.js';
import { getImageByPublicId, uploadImage } from '../services/ImageService.js';
import { isValidObjectId } from 'mongoose';

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

	const settings = createSettingsForUser(userId);

	res.status(201).json(settings);
};

// @desc    Update user settings by UserID, Group ID, and Page ID
// @route   PUT /api/v1/settings/:id/:group/:page
export const updateSettingsByGroupAndPage = async (req, res, next) => {
	const { id, group, page } = req.params;
	const { email, fullName } = req.body.profile;

	console.log(req.body.profile);

	const setting = await Settings.findOne({ userId: id });
	const user = await User.findOne({ _id: id });

	const fields = [];

	if (email) fields.push('email');
	if (fullName) fields.push('fullName');

	const credential = await getCredentialByUserId(id);

	for (let field of fields) {
		const value = req.body.profile[field];
		setting[group][page][field] = value;
		if (field === 'email') credential[field] = value;
	}

	if (email) {
		const updatedEmail = req.body.profile['email'];
		credential.email = updatedEmail;
	}

	if (fullName) {
		const updatedFullName = req.body.profile['fullName'];
		user.name = updatedFullName;
	}

	setting.updatedAt = Date.now();
	credential.updatedAt = Date.now();
	user.updatedAt = Date.now();

	await setting.save();
	await credential.save();
	await user.save();

	res.json(setting);
};

// @desc    Get profile picture for user
// @route   GET /api/v1/settings/:id/account/profile/image
export const getProfileImage = async (req, res, next) => {
	const { id } = req.params;

	// validate id is an object id
	const objectId = isValidObjectId(id);

	if (!objectId) {
		res.status(400).json({ message: 'error', error: 'Invalid ID' });
		return;
	}

	// validate user with id exists
	const user = await getUser(id);

	if (!user) {
		res
			.status(404)
			.json({ message: 'error', error: 'No user found with that ID' });
		return;
	}

	// get profile image for user
	const image = await getImageByPublicId(`profile-images/profile-image-${id}`);

	console.log('image: ', image);

	if (image) {
		res.json({
			message: 'Profile image found for user',
			imageUrl: image.secure_url,
		});
		return;
	}

	res.json({ message: 'No profile image found for user', imageUrl: null });
};

// @desc    Create profile picture for user
// @route   POST /api/v1/settings/:id/account/profile/image
export const createProfileImage = async (req, res, next) => {
	const { id } = req.params;

	// validate id is an object id
	const objectId = isValidObjectId(id);
	if (!objectId) {
		res.status(400).json({ message: 'error', error: 'Invalid ID' });
		return;
	}

	// validate user with id exists
	const user = await getUser(id);
	console.log('user: ', user);

	if (!user) {
		res
			.status(404)
			.json({ message: 'error', error: 'No user found with that ID' });
		return;
	}

	console.log('here???? yep.?');

	const formData = req.file;
	if (!formData) {
		res.status(400).json({ message: 'error', error: 'No image provided' });
		return;
	}

	// validate image is of proper filetypes: JPEG PNG GIF WEBP\
	const fileType = formData.mimetype;
	if (
		fileType !== 'image/jpeg' &&
		fileType !== 'image/png' &&
		fileType !== 'image/gif' &&
		fileType !== 'image/webp'
	) {
		res.status(400).json({ message: 'error', error: 'Invalid file type' });
		return;
	}

	console.log(formData);

	const uploaded = await uploadImage(`profile-image-${id}`, formData.buffer)
		.then((result) => {
			res.status(200).json({
				message: 'Successfully uploaded image.',
				imageUrl: result.secure_url,
			});
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error uploading image', error });
		});

	console.log('uploaded: ', uploaded);

	// validate image is not too large
	// validate user does not already have a profile picture - update otherwise
	// upload image to cloudinary
};

// @desc    Update profile picture for user
// @route   PUT /api/v1/settings/:id/account/profile/image
export const updateProfileImage = async (req, res, next) => {};

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
