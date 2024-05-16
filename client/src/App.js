import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuthContext } from './context/AuthContext';

// const user = { user: 'Cole' };

function App() {
	const { user, setUser } = useAuthContext();

	return (
		<React.StrictMode>
			<Router>
				<Routes>
					<Route
						path='/register'
						element={!user ? <Register /> : <Navigate to='/dashboard' />}
					/>
					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/dashboard' />}
					/>

					<Route
						path='/'
						element={
							user ? <Navigate to='/dashboard' /> : <Navigate to='/register' />
						}
					/>
					<Route
						path='/dashboard'
						element={user ? <Dashboard /> : <Navigate to='/login' />}
					/>
				</Routes>
			</Router>
		</React.StrictMode>
	);
}

export default App;
