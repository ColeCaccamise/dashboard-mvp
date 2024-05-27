import express from 'express';
const router = express.Router();

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
} from '../controllers/settingsController.js';

router.route('/').get(getSettings).post(createSettings);

router.route('/:id').get(getSetting).delete(deleteSettings);

router
	.route('/:id/:group/:page')
	.get(getSettingByGroupAndPage)
	.put(updateSettingsByGroupAndPage);

router.all('*', methodNotAllowed);

export default router;
