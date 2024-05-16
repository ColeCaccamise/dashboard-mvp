import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/form/Input.jsx';
import SubmitButton from '../../components/form/SubmitButton.jsx';
import OAuthButton from '../../components/form/OAuthButton.jsx';
import Divider from '../../components/form/Divider.jsx';
import { useState } from 'react';
import axios from 'axios';

function Register() {
	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const submitForm = async (e) => {
		e.preventDefault();

		const registeredUser = await axios
			.post('/api/v1/auth/register', {
				name,
				username,
				email,
				password,
			})
			.then((res) => {
				console.log(res);
				navigate('/dashboard');
			})
			.catch((err) => {
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
						error={usernameError}
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<Input
						type='text'
						placeholder='Username'
						error={usernameError}
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<Input
						type='email'
						placeholder='Email'
						error={emailError}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<Input
						type='password'
						placeholder='Password'
						error={passwordError}
						onChange={(e) => setPassword(e.target.value)}
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
