import dotenv from 'dotenv';
import React from 'react';
import { Resend } from 'resend';
import { getImageByPublicId } from './ImageService.js';
import { confirmEmailTemplate } from './EmailTemplateService.js';
import { getCredentialByUserId } from './CredentialService.js';
import { generateConfirmationToken } from './AuthService.js';

// import Confirm from '../client/src/emails/Confirm';
dotenv.config({ path: '../config/config.env' });

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PROTOCOL = process.env.PROTOCOL;
const HOSTNAME = process.env.HOSTNAME;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

export const sendEmail = async (sender, recipient, subject, template) => {
	const resend = new Resend(RESEND_API_KEY);

	const emailSent = await resend.emails.send({
		from: sender,
		to: recipient,
		subject: subject,
		html: template,
	});

	console.log(emailSent);

	return emailSent;
};

export const sendConfirmationEmail = async (recipient) => {
	// IMPORTANT: recipient is a User object
	const credential = await getCredentialByUserId(recipient._id);

	// grab recipients name
	const name = recipient.name;

	// grab recipients email
	const email = credential.email;

	// generate confirmation token for user
	const token = generateConfirmationToken(recipient);

	// create template
	const logo = await getImageByPublicId('dashboard-mvp-logo-dark').then(
		(resp) => resp
	);
	const logoUrl = logo.url;

	const template = confirmEmailTemplate(
		name,
		email,
		logoUrl,
		`${PROTOCOL}://${HOSTNAME}/confirm/?confirmationToken=${token}`
	);

	const sender = SENDER_EMAIL;
	const subject = 'Please Confirm Your Email for Dashboard MVP';

	// send through sendEmail
	sendEmail(sender, email, subject, template);
};
