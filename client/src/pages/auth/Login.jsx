import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/form/Input.jsx';
import SubmitButton from '../../components/form/SubmitButton.jsx';
import OAuthButton from '../../components/form/OAuthButton.jsx';
import Divider from '../../components/form/Divider.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext.jsx';
import { toast as toastify } from 'react-toastify';

function Login() {
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { user, setUser } = useAuthContext();

	const navigate = useNavigate();

	const toast = (type, message) => {
		if (type) {
			toastify[type](message, {});
		} else {
			toastify(message, {});
		}
	};

	const submitForm = async (e) => {
		e.preventDefault();

		let missingFields = false;

		if (!email) {
			setEmailError(true);
			missingFields = true;
		}
		if (!password) {
			setPasswordError(true);
			missingFields = true;
		}

		if (missingFields) {
			toast('error', 'Required field(s) are missing.');
			return;
		}

		const registeredUser = await axios
			.post('/api/v1/auth/login', {
				email,
				password,
			})
			.then((res) => {
				// set user in context
				setUser(res.data.user);
				// redirect to dashboard
				navigate('/dashboard');

				return res.data;
			})
			.catch((err) => {
				toast('error', err.response.data.error);
				return err.response.data;
			});

		console.log('response: ', registeredUser);
	};

	return (
		<div className='flex flex-col'>
			{/* <ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={true}
				pauseOnHover
				theme='dark'
				transition={Slide}
			/> */}
			<div className='bg-[#17181A] border-[#21232A] text-white px-6 py-10 shadow-xl rounded-lg max-w-md text-center'>
				<form className='flex flex-col gap-8' onSubmit={(e) => submitForm(e)}>
					<div className='flex flex-col gap-4'>
						<h1 className='text-2xl font-semibold'>
							Welcome back to Dasboard MVP
						</h1>
						<p className='text-white font-light opacity-80'>
							It's good to see you again. Let's get you signed in.
						</p>
					</div>

					<div className='flex flex-col gap-4'>
						<Input
							type='email'
							placeholder='Email'
							error={emailError}
							onChange={(e) => {
								setEmail(e.target.value);
								setEmailError(false);
							}}
							value={email}
							autoFocus={true}
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
					<SubmitButton text='Login' />
					<div>
						Don't have an account?{' '}
						<Link
							to='/register'
							className='underline text-[#575BC7] transition-color duration-300 hover:text-[#676bcf] '
						>
							Register
						</Link>
					</div>
					<Divider />
					<OAuthButton mode='login' />
				</form>
			</div>
		</div>
	);
}

export default Login;
