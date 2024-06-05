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

// @desc    Get all user settings
// @route   GET /api/v1/settings
export const getSettings = (req, res) => {
	res.json({});
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

	console.log('grabbing profile image');

	// validate id is an object id
	const objectId = isValidObjectId(id);

	if (!objectId) {
		res.status(400).json({ message: 'error', error: 'Invalid ID' });
		return;
	}

	// validate user with id exists©b
	const user = await getUser(id);

	if (!user) {
		res.status(404).json({
			message: 'error',
			error: 'No user found with that ID',
			user: user,
		});
		return;
	}

	// check if we have image for user in DB, if not, return no image found with placeholder
	const image = user.profileImage;

	// if image exists, return it
	if (image) {
		res.json({ message: 'Profile photo found', image });
	} else {
		res.status(204).json({
			message: 'User has not uploaded a profile photo',
			image: 'http://localhost:3000/profile.jpeg',
		});
	}
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

	if (!user) {
		res
			.status(404)
			.json({ message: 'error', error: 'No user found with that ID' });
		return;
	}

	const formData = req.file;
	console.log('formData 202: ', formData);
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
			return result;
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error uploading image', error });
		});

	console.log('uploaded: ', uploaded);

	if (uploaded) {
		try {
			user.profileImage = uploaded.secure_url;
			await user.save();
		} catch (error) {
			res.status(500).json({ message: 'Error saving user', error });
			return;
		}
	}

	res.json({
		message: 'Image uploaded',
		user: user,
	});
	return;
	// validate image is not too large
	// validate user does not already have a profile picture - update otherwise
	// upload image to cloudinary
};

// @desc    Update profile picture for user
// @route   PUT /api/v1/settings/:id/account/profile/image
export const updateProfileImage = async (req, res, next) => {
	// check if we have an image in DB, if so, check for it in cloudinary
	// if it exists, delete the image and re create
	// if it doesn't exist, create the image
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
