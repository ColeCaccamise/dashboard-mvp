import express from 'express';
const router = express.Router();

router.use(express.json()); // not including this resulted in an undefined req.body

// controllers
import {
	forgotPassword,
	undefinedRequest,
	confirmEmail,
} from '../controllers/emailsController.js';

router.route('/confirm').post(confirmEmail);
router.route('/forgot').post(forgotPassword);
router.all('*', undefinedRequest);

// TODO separately check for unsupported methods AND routes

export default router;
