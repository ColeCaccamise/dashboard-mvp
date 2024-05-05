const express = require('express');
const router = express.Router();

router.use(express.json()); // not including this resulted in an undefined req.body

router.route('/').all((req, res) => {
	const method = req.method;
	console.log(method);
	res.status(405).json({ message: `${method} method not supported.` }); // Return 405 for unsupported methods
});

router
	.route('/:id')
	.get((req, res) => {
		const id = parseInt(req.params.id);
		const user = users.find((user) => user.id == parseInt(req.params.id));
		if (!user) {
			res.status(404).json({ error: `No user was found with ID ${id}` });
			return;
		}
		res.json(user);
	})
	.post((req, res) => {
		const id = parseInt(req.params.id);
		const includesUser = users.some((user) => user.id == id);
		if (includesUser) {
			res.status(409).json({ error: 'A user already exists with ID ${id}' });
			return;
		}
		users.push({ id: id, name: req.body.name });
		res.json(users);
	})
	.put((req, res) => {
		const id = parseInt(req.params.id);
		const user = users.find((user) => user.id == id);
		if (!user) {
			res.status(404).json({ error: `No user was found with ID ${id}` });
			return;
		}
		user.name = req.body.name;
		res.json(users);
	})
	.delete((req, res) => {
		const id = parseInt(req.params.id);
		const user = users.find((user) => user.id == id);
		if (!user) {
			res
				.status(404)
				.json({ error: `Cannot delete. No user was found with ID ${id}` });
			return;
		}
		const indexToDelete = users.findIndex((u) => u.id == user.id);
		users.splice(indexToDelete, 1);
		res.json(users);
	})
	.all((req, res) => {
		const method = req.method;
		console.log(method);
		res.status(405).json({ message: `${method} method not supported.` }); // Return 405 for unsupported methods
	});

module.exports = router;
