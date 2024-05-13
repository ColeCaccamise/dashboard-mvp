import db from '../config/db.js';
import User from '../model/User.js';
import colors from 'colors';

// validation middleware
import { validateBody, validateId } from '../middleware/validation.js';
import {
	userNotFoundError,
	userExistsError,
} from '../middleware/validation/usersValidation.js';

// @desc    Get all users
// @route   GET /api/v1/users
export const getUsers = async (req, res) => {
	res.json(await User.find());
};

// @desc:   Get a user by ID
// @route:  GET /api/v1/users/:id
export const getUser = async (req, res, next) => {
	const id = req.params.id;
	// const user = users.find((user) => user.id === id);

	const user = await User.findById(id).exec(); // always use .exec() at the end to return a promise & better stack traces

	if (!user) {
		req.userId = id;
		userNotFoundError(req, res, next);
	}

	console.log(user);

	res.json(user);
};

// @desc    Create a user
// @route   POST /api/v1/users/
export const createUser = async (req, res, next) => {
	req.requiredFields = ['name'];
	validateBody(req, res, next);

	const { name } = req.body;

	const user = await User.create({
		name,
	});

	res.json(user);
};

// @desc    Update a user by id
// @route   POST /api/v1/users/:id
export const updateUser = async (req, res, next) => {
	const id = req.params.id;

	const user = await User.findById(id).exec();

	req.userId = id;

	if (!user) {
		userNotFoundError(req, res, next);
		return;
	}

	const { name } = req.body;

	user.name = name;
	user.updatedAt = Date.now();
	await user.save();

	console.log(user);

	// user.name = req.body.name;
	// res.json(users);

	res.json(user);
};

// @desc    Delete a user by id
// @route   DELETE /api/v1/users/:id
export const deleteUser = async (req, res, next) => {
	const id = req.params.id;

	const user = await User.deleteOne({ _id: id });

	console.log(user);

	if (!user) {
		userNotFoundError(next, id);
	}

	// const indexToDelete = users.findIndex((u) => u.id == user.id);
	// users.splice(indexToDelete, 1);
	res.json(user);
};
// @desc    Deny all other methods
// @route   *
export const methodNotAllowed = (req, res) => {
	const method = req.method;
	res.status(405).json({
		message: `${method} method not allowed for /api/v1/users${req.url}`,
	});
};
