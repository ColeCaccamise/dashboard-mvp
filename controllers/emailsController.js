import { sendEmail } from '../services/EmailService.js';

// @desc send a confirmation emial
// @route POST /api/v1/emails/confirm
export const confirmEmail = async (req, res, next) => {
	await sendEmail();
};

// @desc send a forgot password email
// @route
export const forgotPassword = async (req, res, next) => {};

// @desc decline undefined requests
// @route *
export const undefinedRequest = async (req, res, next) => {
	res.status(404).json({ error: 'Route does not exist' });
};
