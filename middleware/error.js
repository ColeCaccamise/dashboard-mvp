import colors from 'colors';

const errorHandler = (err, req, res, next) => {
	const errorType = err.type || 'serverError';
	const message = err.message || 'Internal server error';
	const status = err.status || 500;
	const requiredFields = err.requiredFields;
	const optionalFields = err.optionalFields;
	const serverMessage = err.serverMessage;
	const toastType = err.toastType;

	res.status(status).json({
		error: message,
		errorType,
		toastType,
		requiredFields,
		optionalFields,
	});

	if (serverMessage) {
		console.log('\n');
		console.log(`${err.serverMessage || ''}`.red.bold);
		console.log('\n');
	}

	next(err);
};

export default errorHandler;
