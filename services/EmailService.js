import dotenv from 'dotenv';
import React from 'react';
import { Resend } from 'resend';

// import Confirm from '../client/src/emails/Confirm';
dotenv.config({ path: '../config/config.env' });

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const sendEmail = async (req, res, next) => {
	const resend = new Resend(RESEND_API_KEY);

	const sender = 'onboarding@resend.dev';
	const recepient = 'colecaccamise@gmail.com';

	const emailSent = await resend.emails.send({
		from: sender,
		to: recepient,
		subject: 'hello world',
		html: '<h1>hello world</h1>',
	});

	console.log('email sent: ', emailSent);
};
