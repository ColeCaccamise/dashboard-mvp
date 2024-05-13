import colors from 'colors';

const logger = (req, res, next) => {
	const methodColors = {
		GET: 'green',
		POST: 'yellow',
		PUT: 'blue',
		DELETE: 'red',
	};

	const color = methodColors[req.method] || 'white';

	console.log('\n');
	console.log('---------------------------------');
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`[color]);
	next();
	console.log('---------------------------------');
	console.log('\n');
};

export default logger;
