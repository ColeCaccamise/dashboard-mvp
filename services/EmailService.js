import dotenv from 'dotenv';
import React from 'react';
import { Resend } from 'resend';
import { getImageByPublicId } from './ImageService.js';
import { confirmEmailTemplate } from './EmailTemplateService.js';

// import Confirm from '../client/src/emails/Confirm';
dotenv.config({ path: '../config/config.env' });

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const sendEmail = async (req, res, next) => {
	const resend = new Resend(RESEND_API_KEY);

	const { sender, recipient, subject } = req;

	console.log(sender, recipient, subject);

	const logo = await getImageByPublicId('dashboard-mvp-logo-dark').then(
		(resp) => resp
	);

	const logoUrl = logo.url;

	const html = confirmEmailTemplate(
		'Cole',
		recipient,
		logoUrl,
		'ABC123',
		'http://localhost:3000/confirm/ABC123'
	);

	console.log(logoUrl);

	const emailSent = await resend.emails.send({
		from: sender,
		to: recipient,
		subject: subject,
		html: html,
	});

	console.log('email sent: ', emailSent);
};
