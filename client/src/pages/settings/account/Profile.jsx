import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import ApplicationShell from '../../../components/ApplicationShell';
import axios from 'axios';

function Profile() {
	const { user, setUser } = useAuthContext();

	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');

	const handleUpdate = async (field, value) => {
		const group = 'account';
		const page = 'profile';
		const body = {
			profile: {
				[field]: value,
			},
		};

		await axios
			.put(`/api/v1/settings/${user._id}/${group}/${page}`, body)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log('error: ', err);
			});
	};

	const saveChanges = (field, e) => {
		e.preventDefault();

		if (e.key !== 'Enter') return;

		console.log('in here');

		switch (field) {
			case 'email':
				console.log('saving email ', e.target.value);
				handleUpdate('email', email);
				break;
			case 'fullName':
				console.log('saving full name ', e.target.value);
				handleUpdate('fullName', fullName);
				break;
			case 'username':
				console.log('saving username ', e.target.value);
				handleUpdate('username', username);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const group = 'account';
		const page = 'profile';
		const getSettings = async () => {
			await axios
				.get(`/api/v1/settings/${user._id}/${group}/${page}`)
				.then((res) => {
					const profile = res.data.profile;
					setEmail(profile.email);
					setFullName(profile.fullName);
					setUsername(profile.username);
					console.log(res.data);
				})
				.catch((err) => {
					console.error('YOO: ', err.response.data);
				});
			console.log('user: ', user);
		};

		getSettings();

		console.log('user: ', user);
	}, [user]);

	return (
		<ApplicationShell mode='settings'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-white text-2xl font-bold '>
					Settings for {user.name}
				</h1>
				<p className='text-neutral-400 text-sm'>
					Manage your Dashboard MVP profile
				</p>
			</div>
			<div className='border-solid border-2 border-neutral-500 p-4 rounded-sm flex flex-col gap-6'>
				<form onSubmit={(e) => saveChanges(e)}>
					<div className='w-full flex justify-between items-center'>
						<span className='text-white'>Email</span>
						<div className='border-solid border-2 border-neutral-500 p-2 rounded-sm'>
							<input
								type='email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								onKeyUp={(e) => saveChanges('email', e)}
								className='bg-transparent text-white '
							/>
						</div>
					</div>
					<div className='border-t-2 border-neutral-500'></div>
					<div className='w-full flex justify-between items-center'>
						<span class='text-white'>Full Name</span>
						<div className='border-solid border-2 border-neutral-500 p-2 rounded-sm'>
							<input
								type='text'
								value={fullName}
								onChange={(e) => {
									setFullName(e.target.value);
								}}
								onKeyUp={(e) => saveChanges('fullName', e)}
								className='bg-transparent text-white '
							/>
						</div>
					</div>
					<div className='border-t-2 border-neutral-500'></div>
					<div className='w-full flex justify-between items-center'>
						<span class='text-white'>Username</span>
						<div className='border-solid border-2 border-neutral-500 p-2 rounded-sm'>
							<input
								type='text'
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								onKeyUp={(e) => saveChanges('username', e)}
								className='bg-transparent text-white '
							/>
						</div>
					</div>
				</form>
			</div>
		</ApplicationShell>
	);
}

export default Profile;
