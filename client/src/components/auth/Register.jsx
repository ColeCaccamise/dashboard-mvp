import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../form/Input.jsx';
import SubmitButton from '../form/SubmitButton.jsx';
import OAuthButton from '../form/OAuthButton.jsx';
import Divider from '../form/Divider.jsx';
import { useState } from 'react';

function Register() {
	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	return (
		<div className='bg-[#17181A] border-[#21232A] text-white px-6 py-10 shadow-xl rounded-lg max-w-md text-center'>
			<form className='flex flex-col gap-8' action=''>
				<h1 className='text-xl font-semibold'>
					Create your Dashboard MVP account
				</h1>
				<div className='flex flex-col gap-4'>
					<Input type='text' placeholder='Username' error={usernameError} />
					<Input type='email' placeholder='Email' error={emailError} />
					<Input type='password' placeholder='Password' error={passwordError} />
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
