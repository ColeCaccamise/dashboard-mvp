export const validateBody = (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
		const err = new Error(`Request body is missing.`);
		err.status = 400;
		err.type = 'missingBody';
		err.requiredFields = req.requiredFields;
		err.optionalFields = req.optionalFields;
		return next(err);
	}
};

export const validateId = (req, res, next) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		const err = new Error(`ID must be a number`);
		err.status = 400;
		err.type = 'invalidInput';
		return next(err);
	}
};
