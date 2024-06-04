import express from 'express';
const router = express.Router();

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

router.use(express.json()); // not including this resulted in an undefined req.body

// routes
import {
	getSettings,
	getSetting,
	createSettings,
	deleteSettings,
	methodNotAllowed,
	getSettingByGroupAndPage,
	updateSettingsByGroupAndPage,
	createProfileImage,
	getProfileImage,
} from '../controllers/settingsController.js';

router.route('/').get(getSettings).post(createSettings);

router.route('/:id').get(getSetting).delete(deleteSettings);

router
	.route('/:id/:group/:page')
	.get(getSettingByGroupAndPage)
	.put(updateSettingsByGroupAndPage);

// profile image
router
	.route('/:id/account/profile/image')
	.get(getProfileImage)
	.post(upload.single('image'), createProfileImage)
	.put();

router.all('*', methodNotAllowed);

export default router;
