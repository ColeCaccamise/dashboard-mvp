import colors from 'colors';

const errorHandler = (err, req, res, next) => {
	const errorType = err.type || 'serverError';
	const message = err.message || 'Internal server error';
	const status = err.status || 500;
	const requiredFields = err.requiredFields;
	const optionalFields = err.optionalFields;

	res.status(status).json({
		error: message,
		errorType,
		requiredFields,
		optionalFields,
	});

	next(err);
};

export default errorHandler;
