const express = require('express');
const router = express.Router();

const users = [
	{ id: 1, name: 'Cole Caccamise' },
	{ id: 2, name: 'Steven Bartlett' },
	{ id: 3, name: 'Brad Traversy' },
	{ id: 4, name: 'Elon Musk' },
];

router.get('/', (req, res) => {
	res.json(users);
});

module.exports = router;
