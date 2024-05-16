import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

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
