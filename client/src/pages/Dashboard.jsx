import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Logout from './auth/Logout';
import ApplicationShell from '../components/ApplicationShell';
import axios from 'axios';
import { toast as toastify } from 'react-toastify';

function Dashboard() {
	const { user, setUser } = useAuthContext();

	const [timeOfDay, setTimeOfDay] = useState('evening');

	const toast = (type, message) => {
		if (type) {
			toastify[type](message, {});
		} else {
			toastify(message, {});
		}
	};

	useEffect(() => {
		const date = new Date();
		const hours = date.getHours();
		if (hours < 12) {
			setTimeOfDay('morning');
		} else if (hours < 18) {
			setTimeOfDay('afternoon');
		} else {
			setTimeOfDay('evening');
		}
	}, []);

	return (
		<ApplicationShell>
			<div>
				<h1 className='text-white text-lg font-bold'>
					Good {timeOfDay}, {user.name}
				</h1>
				<Logout />
			</div>
		</ApplicationShell>
	);
}

export default Dashboard;
