import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

async function checkUser() {
	const userData = await axios
		.get('/api/v1/auth/verify', { withCredentials: true })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.error('Error verifying user: ', err.response.data);
			return null;
		});
	return userData;
}

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkUser()
			.then((data) => {
				setUser(data?.user);
			})
			.catch((err) => {
				console.error('Error verifying user: ', err);
			});
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			'useAuthContext must be used within an AuthContextProvider'
		);
	}
	return context;
}

export default AuthContextProvider;
