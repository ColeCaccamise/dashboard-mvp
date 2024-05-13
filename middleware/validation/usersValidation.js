export const userNotFoundError = (req, res, next) => {
	const err = new Error(`No user was found with ID ${req.userId}`);
	err.status = 404;
	err.type = 'userNotFound';
	return next(err);
};

export const userExistsError = (req, res, next) => {
	const err = new Error(`A user already exists with ID ${req.userId}`);
	err.status = 409;
	err.type = 'userExists';
	return next(err);
};
