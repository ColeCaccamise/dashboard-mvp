import React, { useEffect, useState } from 'react';
import Divider from '../../components/form/Divider.jsx';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext.jsx';
import { useSearchParams } from 'react-router-dom';
import { toast as toastify } from 'react-toastify';

function Confirm() {
	const { user, setUser } = useAuthContext();
	const [searchParams, setSearchParams] = useSearchParams();

	const toast = (type, message) => {
		if (type) {
			toastify[type](message, {});
		} else {
			toastify(message, {});
		}
	};

	const token = searchParams.get('confirmationToken') || '';

	useEffect(() => {
		if (!token) return;

		axios
			.post(`/api/v1/auth/confirm/${token}`)
			.then((res) => {
				toast('success', 'Email confirmed.');
				setUser(res.data.user);
			})
			.catch((err) => {
				console.error(err.response.data.error);
				console.log(err);
				if (err.response.data.toastType === 'warning') {
					toast('warning', err.response.data.error);
				} else {
					toast('error', err.response.data.error);
				}
			});
	}, [token, setUser]);

	const resendConfirmationEmail = () => {
		axios.post('/api/v1/emails/confirm', { userId: user._id });
	};

	return (
		<div className='flex flex-col'>
			<div className='bg-[#17181A] border-[#21232A] text-white px-6 py-10 shadow-xl rounded-lg max-w-md text-center'>
				<div className='flex flex-col gap-4'>
					<h1 className='text-2xl font-semibold'>Confirm Your Email Address</h1>
					<p className='text-white font-light opacity-80'>
						We've sent a confirmation email to your email address. Please click
						the link in the email to confirm your email address.
					</p>
				</div>
				<div className='my-5'>
					<Divider />
				</div>

				<div>
					<button
						onClick={() => {
							resendConfirmationEmail();
						}}
						className='underline text-[#575BC7] transition-color duration-300 hover:text-[#676bcf] '
					>
						Resend confirmation email
					</button>
				</div>
			</div>
		</div>
	);
}

export default Confirm;
