import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Logout from './auth/Logout';
import ApplicationShell from '../components/ApplicationShell';
import axios from 'axios';
import { toast as toastify } from 'react-toastify';

function Dashboard() {
	const { user, setUser } = useAuthContext();

	const toast = (type, message) => {
		if (type) {
			toastify[type](message, {});
		} else {
			toastify(message, {});
		}
	};

	return (
		<ApplicationShell>
			<div>
				<h1 className='text-white text-lg font-bold'>
					Welcome back, {user.name}
				</h1>
				<Logout />
				<button
					className='text-white'
					onClick={async () => {
						console.log('starting up...');
						try {
							await axios
								.post('/api/v1/emails/confirm', { userId: user._id })
								.then((res) => {
									toast('success', 'Email sent');
									console.log('email sent', res.data);
								})
								.catch((error) => {
									toast('error', 'Error sending email');
									console.error('error sending email', error);
								});
						} catch (error) {
							console.error(error);
						}
					}}
				>
					Send email
				</button>
			</div>
		</ApplicationShell>
	);
}

export default Dashboard;
