import express from 'express';
const router = express.Router();

router.use(express.json()); // not including this resulted in an undefined req.body

// controllers
import {
	register,
	login,
	logout,
	methodNotAllowed,
} from '../controllers/authController.js';

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').post(logout);

router.all('*', methodNotAllowed);

export default router;
