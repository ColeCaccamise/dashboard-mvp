import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';

function Logout() {
	const { user, setUser } = useAuthContext();

	const navigate = useNavigate();

	const handleLogout = async () => {
		console.log('hellooo');
		await axios
			.post('/api/v1/auth/logout')
			.then(() => {
				// set user in context
				setUser(null);
				// redirect to login
				navigate('/login');
			})
			.catch((err) => {
				console.error('Error logging out: ', err.response.data);
				return err.response.data;
			});
	};

	return (
		<button onClick={() => handleLogout()} className='text-white'>
			Logout
		</button>
	);
}

export default Logout;
