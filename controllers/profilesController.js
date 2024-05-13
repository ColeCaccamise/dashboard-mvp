const userProfiles = [
	{
		userId: 1,
		name: 'Cole Caccamise',
		username: 'colecaccamise',
		email: 'cole@dashboard-mvp.com',
		profilePicture: 'https://via.placeholder.com/150',
		bio: 'CEO of Dashboard MVP',
	},
	{
		userId: 2,
		name: 'Steven Bartlett',
		username: 'stevenbartlett',
		email: 'steve@doac.com',
		profilePicture: 'https://via.placeholder.com/150',
		bio: 'CEO of The Social Chain Group',
	},
];

// @desc    get all user profiles
// @route   GET /api/v1/profiles
export const getProfiles = (req, res) => {
	console.log('in here');
	res.json(userProfiles);
};

// @desc   get user profile by ID
// @route  GET /api/v1/profiles/:id
export const getProfile = (req, res) => {
	const id = parseInt(req.params.id);
	const user = userProfiles.find((user) => user.userId == id);
	if (!user) {
		res
			.status(404)
			.json({ error: `No user profile was found with userId ${id}` });
		return;
	}
	res.json(user);
};

// @desc    create a new user profile for a user by id
// @route   POST /api/v1/profiles/:id
export const createProfile = (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		res.status(400).json({ error: 'ID must be a number' });
		return;
	}
	const includesUser = userProfiles.some((user) => user.userId == id);

	if (includesUser) {
		res
			.status(409)
			.json({ error: `A user profile already exists with userId ${id}` });
		return;
	}

	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			error:
				'Request body is missing. Required fields: name, username, email, profilePicture, bio.',
			errorType: 'missingBody',
		});
		return;
	}

	const { name, username, email, profilePicture, bio } = req.body;

	const missingFields = [];

	if (!name) {
		missingFields.push('name');
	}
	if (!username) {
		missingFields.push('username');
	}
	if (!email) {
		missingFields.push('email');
	}
	if (!profilePicture) {
		missingFields.push('profilePicture');
	}
	if (!bio) {
		missingFields.push('bio');
	}

	if (missingFields.length > 0) {
		res.status(400).json({
			error: 'Required field(s) are missing.',
			errorType: 'missingFields',
			missingFields: missingFields,
		});
		return;
	}

	userProfiles.push({
		userId: id,
		name,
		username,
		email,
		profilePicture,
		bio,
	});
	res.json(userProfiles);
};

export const updateProfile = (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.status(400).json({ error: 'ID must be a number' });
		return;
	}

	const profileExists = userProfiles.some((user) => user.userId === id);

	if (!profileExists) {
		res.status(404).json({
			error: `No user profile was found with userId ${id}`,
			errorType: 'notFound',
		});
	}

	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			error:
				'Request body is missing. Optional fields (at least 1 is required): name, username, email, profilePicture, bio.',
			errorType: 'missingBody',
		});
		return;
	}

	const { name, username, email, profilePicture, bio } = req.body;
	console.log(name, username, email, profilePicture, bio);

	const user = userProfiles.find((user) => user.userId == id);

	console.log(
		user.name,
		user.username,
		user.email,
		user.profilePicture,
		user.bio
	);

	user.name = name || user.name;
	user.username = username || user.username;
	user.email = email || user.email;
	user.profilePicture = profilePicture || user.profilePicture;
	user.bio = bio || user.bio;

	res.json(user);
};

// @desc    delete a user profile by ID
// @route   DELETE /api/v1/profiles/:id
export const deleteProfile = (req, res) => {
	const id = parseInt(req.params.id);
	const user = userProfiles.find((user) => user.userId === id);
	if (!user) {
		res
			.status(404)
			.json({ error: `Cannot delete. No user was found with ID ${id}` });
		return;
	}
	const indexToDelete = userProfiles.findIndex((u) => u.userId === user.userId);
	userProfiles.splice(indexToDelete, 1);
	res.json(userProfiles);
};

// @desc    Deny all other methods
// @route   *
export const methodNotAllowed = (req, res) => {
	const method = req.method;
	res.status(405).json({
		message: `${method} method not allowed for /api/v1/profiles${req.url}`,
	});
};
