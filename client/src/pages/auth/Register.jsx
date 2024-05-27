import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/form/Input.jsx';
import SubmitButton from '../../components/form/SubmitButton.jsx';
import OAuthButton from '../../components/form/OAuthButton.jsx';
import Divider from '../../components/form/Divider.jsx';
import { useState } from 'react';
import axios from 'axios';
import { toast as toastify } from 'react-toastify';
import { set } from 'mongoose';

function Register() {
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const toast = (type, message) => {
		if (type) {
			toastify[type](message, {});
		} else {
			toastify(message, {});
		}
	};

	const resetErrors = () => {
		setEmailError(false);
		setPasswordError(false);
		setNameError(false);
	};

	const submitForm = async (e) => {
		e.preventDefault();

		const registeredUser = await axios
			.post('/api/v1/auth/register', {
				name,

				email,
				password,
			})
			.then((res) => {
				toast('success', 'Account created successfully!');
				navigate('/dashboard');
			})
			.catch((err) => {
				resetErrors();
				toast('error', err.response.data.error);

				if (err.response.data.missingFields) {
					err.response.data.missingFields.forEach((field) => {
						if (field === 'email') {
							setEmailError(true);
						} else if (field === 'password') {
							setPasswordError(true);
						} else if (field === 'name') {
							setNameError(true);
						}
					});
				}

				return err.response.data;
			});

		console.log('response: ', registeredUser);
	};

	return (
		<div className='bg-[#17181A] border-[#21232A] text-white px-6 py-10 shadow-xl rounded-lg max-w-md text-center'>
			<form className='flex flex-col gap-8' onSubmit={(e) => submitForm(e)}>
				<h1 className='text-2xl font-semibold'>
					Create your Dashboard MVP account
				</h1>
				<div className='flex flex-col gap-4'>
					<Input
						type='text'
						placeholder='Name'
						error={nameError}
						onChange={(e) => {
							setName(e.target.value);
							setNameError(false);
						}}
						value={name}
						autoFocus={true}
					/>
					<Input
						type='email'
						placeholder='Email'
						error={emailError}
						onChange={(e) => {
							setEmail(e.target.value);
							setEmailError(false);
						}}
						value={email}
					/>
					<Input
						type='password'
						placeholder='Password'
						error={passwordError}
						onChange={(e) => {
							setPassword(e.target.value);
							setPasswordError(false);
						}}
						value={password}
					/>
				</div>

				<SubmitButton text='Register' />
				<div>
					Already have an account?{' '}
					<Link
						to='/login'
						className='underline text-[#575BC7] transition-color duration-300 hover:text-[#676bcf] '
					>
						Log in
					</Link>
				</div>

				<Divider />

				<OAuthButton />
			</form>
		</div>
	);
}

export default Register;
