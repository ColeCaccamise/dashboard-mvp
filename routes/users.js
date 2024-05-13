import express from 'express';
const router = express.Router();

// controller methods
import {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	methodNotAllowed,
} from '../controllers/usersController.js';

router.use(express.json()); // not including this resulted in an undefined req.body

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.all('*', methodNotAllowed);

export default router;
