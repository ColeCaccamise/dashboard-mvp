import express from 'express';
const router = express.Router();

router.use(express.json()); // not including this resulted in an undefined req.body

// controllers
import {
	verify,
	register,
	confirm,
	login,
	logout,
	methodNotAllowed,
} from '../controllers/authController.js';

router.route('/verify').get(verify);

router.route('/register').post(register);

router.route('/confirm/:token').post(confirm);

router.route('/login').post(login);

router.route('/logout').post(logout);

router.all('*', methodNotAllowed);

export default router;
