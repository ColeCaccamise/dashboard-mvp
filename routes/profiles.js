import express from 'express';
const router = express.Router();

router.use(express.json()); // not including this resulted in an undefined req.body

// bring in controllers
import {
	getProfiles,
	getProfile,
	createProfile,
	updateProfile,
	deleteProfile,
	methodNotAllowed,
} from '../controllers/profilesController.js';

router.route('/').get(getProfiles);

router
	.route('/:id')
	.get(getProfile)
	.post(createProfile)
	.put(updateProfile)
	.delete(deleteProfile);

router.all('*', methodNotAllowed);

export default router;
