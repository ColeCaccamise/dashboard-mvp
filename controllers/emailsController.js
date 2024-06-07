import { sendEmail, sendConfirmationEmail } from '../services/EmailService.js';
import { getUser } from '../services/UserService.js';

// @desc send a confirmation emial
// @route POST /api/v1/emails/confirm
export const confirmEmail = async (req, res, next) => {
	const { userId } = req.body;

	const user = await getUser(userId);

	console.log(user);

	await sendConfirmationEmail(user)
		.then((resp) => {
			res.status(200).json({ success: true, response: resp });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: error });
		});
};

// @desc send a forgot password email
// @route
export const forgotPassword = async (req, res, next) => {
	const { userId } = req.body;

	const user = await getUser(userId);

	const recipient = 'colecaccamise@gmail.com';
	const sender = 'onboarding@resend.dev';

	req.sender = sender;
	req.recipient = recipient;

	req.html = `
		<h1>Reset Password</h1>
		<p>Hi ${user.name},</p>
		<p>Please reset your password with the link below.</p>
	`;
	req.subject = 'Please Confirm Your Email for Dashboard MVP';

	await sendEmail(req, res, next)
		.then((resp) => {
			res.status(200).json({ success: true, response: resp });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: error });
		});
};

// @desc decline undefined requests
// @route *
export const undefinedRequest = async (req, res, next) => {
	res.status(404).json({ error: 'Route does not exist' });
};
