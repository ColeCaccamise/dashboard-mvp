const express = require('express');
const router = express.Router();

const errorMessages = {
	invalidId: 'User settings id must be a number',
	alreadyExists: 'A user with userId ${id} already has settings',
	missingBody:
		'Request body is missing. Required fields: userInfo (object with keys name, username, email). Optional fields: notificationsEnabled, userLanguage, userTimezone, userCommunicationPreference, theme, twoFactorAuthEnabled, billing.',
};

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
	console.log('ID: ', id);
	console.log(userSettings);
	const user = userSettings.find((user) => user.userInfo['userId'] == id);
	console.log(userSettings);
	if (!user) {
		next({
			status: 404,
			message: `No user settings were found for userId ${id}`,
		});
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

router.use(express.json()); // not including this resulted in an undefined req.body

router.route('/').get((req, res) => {
	res.json(userSettings);
});

router
	.route('/:id')
	.get((req, res, next) => {
		const id = parseInt(req.params.id);
		if (isNaN(id)) {
			res.json({
				status: 400,
				message: 'User settings id must be a number',
			});
		}
		const user = findUser(id, next);
		if (!user) {
			res.json({
				status: 404,
				message: `No user settings were found for userId ${id}`,
			});
		}
		res.json(user);
	})
	.post((req, res, next) => {
		const id = parseInt(req.params.id);
		invalidId(id, next);
		const userInfoData = req.body['userInfo'];

		const includesUser = userSettings.some(
			(user) => user.userInfo['userId'] === id
		);

		if (includesUser) {
			res.status(409).json({
				error: `A user with userId ${id} already has settings`,
				errorType: 'alreadyExists',
			});
			return;
		}

		if (Object.keys(req.body).length === 0) {
			res.status(400).json({
				error: errorMessages['missingBody'],
				errorType: 'missingBody',
			});
			return;
		}

		if (!userInfoData) {
			res.status(400).json({
				error:
					'Request body is missing. Required fields: userInfo (object with keys name, username, email)',
				errorType: 'missingBody',
			});
			return;
		}

		// loop over the user info object and check if all required fields are present, discard all others
		const expectedFields = ['name', 'username', 'email'];
		const userInfo = {
			userId: id,
		};
		for (let field of expectedFields) {
			if (!userInfoData[field]) {
				res.status(400).json({
					error: `userInfo object is missing required field: ${field}`,
					errorType: 'missingField',
				});
				return;
			}
			userInfo[field] = userInfoData[field];
		}

		console.log('updated user info: ', userInfo);

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

		console.log(settingFields);

		userSettings.push({
			userInfo,
			...settingFields,
		});
		res.json(userSettings);
	})
	.put((req, res) => {
		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			res.status(400).json({ error: 'ID must be a number' });
			return;
		}

		const user = userSettings.find((user) => user['userInfo']['userId'] === id);

		if (!user) {
			res.status(404).json({
				error: `No user profile was found with userId ${id}`,
				errorType: 'notFound',
			});
		}

		const {
			notificationsEnabled,
			userLanguage,
			userTimezone,
			userCommunicationPreference,
			billing,
			theme,
		} = req.body;

		const fields = {
			notificationsEnabled,
			userLanguage,
			userTimezone,
			userCommunicationPreference,
			billing,
			theme,
		};

		const fieldsToUpdate = [];

		// TODO: allow updating of userInfo but NOT id

		for (let field of Object.keys(fields)) {
			const value = fields[field];

			if (value) {
				fieldsToUpdate.push(field);
			}
		}

		for (let field of fieldsToUpdate) {
			user[field] = fields[field];
		}

		res.json(user);
	})
	.delete((req, res) => {
		const id = parseInt(req.params.id);
		const user = userSettings.find((user) => user.userId === id);
		if (!user) {
			res
				.status(404)
				.json({ error: `Cannot delete. No user was found with ID ${id}` });
			return;
		}
		const indexToDelete = userSettings.findIndex(
			(u) => u.userId === user.userId
		);
		userSettings.splice(indexToDelete, 1);
		res.json(userProfiles);
	});

router.all('*', (req, res) => {
	const method = req.method;
	res.status(405).json({ message: `${method} method not allowed` });
});

module.exports = router;
