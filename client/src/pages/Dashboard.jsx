import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Logout from './auth/Logout';
import ApplicationShell from '../components/ApplicationShell';

function Dashboard() {
	const { user, setUser } = useAuthContext();

	return (
		<ApplicationShell>
			<div>
				<h1 className='text-white text-lg font-bold'>
					Welcome back, {user.name}
				</h1>
				<Logout />
			</div>
		</ApplicationShell>
	);
}

export default Dashboard;
