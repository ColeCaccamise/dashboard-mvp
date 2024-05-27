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
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const contextClass = {
// 	success: 'bg-blue-600',
// 	error: 'bg-red-600',
// 	info: 'bg-gray-600',
// 	warning: 'bg-orange-400',
// 	default: 'bg-indigo-600',
// 	dark: 'bg-white-600 font-gray-300',
// };

function App() {
	const { user, setUser } = useAuthContext();

	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={true}
				pauseOnHover
				theme='dark'
				transition={Slide}
			/>
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
								user ? (
									<Navigate to='/dashboard' />
								) : (
									<Navigate to='/register' />
								)
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
		</>
	);
}

export default App;
