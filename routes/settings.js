import express from 'express';
const router = express.Router();

router.use(express.json()); // not including this resulted in an undefined req.body

// routes
import {
	getSettings,
	getSetting,
	createSettings,
	updateSettings,
	deleteSettings,
	methodNotAllowed,
} from '../controllers/settingsController.js';

router.route('/').get(getSettings);

router
	.route('/:id')
	.get(getSetting)
	.post(createSettings)
	.put(updateSettings)
	.delete(deleteSettings);

router.all('*', methodNotAllowed);

export default router;
