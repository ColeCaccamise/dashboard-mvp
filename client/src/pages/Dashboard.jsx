import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { set } from 'mongoose';

function Dashboard() {
	const { user, setUser } = useAuthContext();
	console.log(user);

	return (
		<div>
			<h1 className='text-white text-lg font-bold'>
				Welcome back, {user.name}
			</h1>
		</div>
	);
}

export default Dashboard;
