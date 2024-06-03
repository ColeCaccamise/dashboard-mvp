import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import ApplicationShell from '../../../components/ApplicationShell';
import axios from 'axios';
import { toast as toastify } from 'react-toastify';
import Input from '../../../components/form/Input';

function Profile() {
	const { user, setUser } = useAuthContext();

	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [image, setImage] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [lastSubmit, setLastSubmit] = useState(null);

	const toast = (type, message) => {
		if (type) {
			toastify[type](message, {});
		} else {
			toastify(message, {});
		}
	};

	const saveChanges = async (e) => {
		e.preventDefault();

		if (isSubmitting) return;
		if (lastSubmit && Date.now() - lastSubmit < 2000) return;

		setIsSubmitting(true);
		setLastSubmit(Date.now());

		// validate missing fields
		if (!email && !fullName) {
			toast('error', 'Email and Full Name cannot be empty.');
			return;
		} else if (!email) {
			toast('error', 'Email cannot be empty.');
			return;
		} else if (!fullName) {
			toast('error', 'Full Name cannot be empty.');
		}

		const group = 'account';
		const page = 'profile';
		const body = {
			profile: {
				email,
				fullName,
			},
		};

		await axios
			.put(`/api/v1/settings/${user._id}/${group}/${page}`, body)
			.then((res) => {
				toast('success', 'Profile updated successfully.');
				console.log(res.data);
				setIsSubmitting(false);
			})
			.catch((err) => {
				toast('error', err.response.data.error);
				console.log('error: ', err);
				setIsSubmitting(false);
			});
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
				})
				.catch((err) => {
					console.error('YOO: ', err.response.data);
				});
		};

		getSettings();
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
				<form onSubmit={(e) => saveChanges(e)} disabled={isSubmitting}>
					<div className='w-full flex justify-between items-center'>
						<span className='text-white'>Profile Picture</span>
						<div className='border-solid border-2 border-neutral-500 p-2 rounded-sm'>
							<img alt={`${user.name}`} src={image.filename} />
							<Input
								type='file'
								value={image?.filename}
								onChange={(e) => {
									setImage(e.target.files[0]);
								}}
								className='bg-transparent text-white '
							/>
						</div>
					</div>
					<div className='w-full flex justify-between items-center'>
						<span className='text-white'>Email</span>
						<div className='border-solid border-2 border-neutral-500 p-2 rounded-sm'>
							<Input
								type='email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								className='bg-transparent text-white '
							/>
						</div>
					</div>
					<div className='border-t-2 border-neutral-500 my-4'></div>
					<div className='w-full flex justify-between items-center'>
						<span class='text-white'>Full Name</span>
						<div className='border-solid border-2 border-neutral-500 p-2 rounded-sm'>
							<Input
								type='text'
								value={fullName}
								onChange={(e) => {
									setFullName(e.target.value);
								}}
								className='bg-transparent text-white'
							/>
						</div>
					</div>
					<input
						type='submit'
						style={{ display: 'none' }}
						disabled={isSubmitting}
					/>
				</form>
			</div>
		</ApplicationShell>
	);
}

export default Profile;
