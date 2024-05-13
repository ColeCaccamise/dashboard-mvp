export const notFoundError = (req, res, next) => {
	const message = req.errorMessage || 'Not found';
	const errorType = req.errorType || 'notFound';

	const err = new Error(message);
	err.status = 404;
	err.type = errorType;
	err.requiredFields = req.requiredFields;
	err.optionalFields = req.optionalFields;
	return next(err);
};

export const existsError = (req, res, next) => {
	const message = req.errorMessage || 'Resource already exists';
	const errorType = req.errorType || 'alreadyExists';

	const err = new Error(message);
	err.status = 409;
	err.type = errorType;
	return next(err);
};
