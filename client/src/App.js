import axios from 'axios';
import React, { Profiler, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Profile from './pages/settings/account/Profile.jsx';
import { useAuthContext } from './context/AuthContext';

function App() {
	const { user, setUser } = useAuthContext();

	console.log(user);

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
					<Route
						path='/support'
						element={user ? <Support /> : <Navigate to='/login' />}
					/>
					<Route
						path='/settings/account/profile'
						element={user ? <Profile /> : <Navigate to='/login' />}
					/>
					console.log('user: ', user);
					<Route path='*' element={<Navigate to='/login' />} />
				</Routes>
			</Router>
		</React.StrictMode>
	);
}

export default App;
