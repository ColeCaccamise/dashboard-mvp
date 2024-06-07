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
import Confirm from './pages/auth/Confirm.jsx';

// const contextClass = {
// 	success: 'bg-blue-600',
// 	error: 'bg-red-600',
// 	info: 'bg-gray-600',
// 	warning: 'bg-orange-400',
// 	default: 'bg-indigo-600',
// 	dark: 'bg-white-600 font-gray-300',
// };

function ConfirmRoute({ verified, unverified, notLoggedIn = '/login' }) {
	const { user, setUser } = useAuthContext();

	if (user) {
		if (user.verified === true) {
			return verified;
		} else {
			return unverified;
		}
	} else {
		return notLoggedIn;
	}
}

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
			{/* <React.StrictMode> */}
			<Router>
				<Routes>
					<Route
						path='/register'
						element={
							<ConfirmRoute
								verified={<Navigate to='/dashboard' />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Register />}
							/>
						}
					/>
					<Route
						path='/confirm'
						element={
							<ConfirmRoute
								verified={<Navigate to='/dashboard' />}
								unverified={<Confirm />}
								notLoggedIn={<Confirm />}
							/>
						}
					/>
					<Route
						path='/login'
						element={
							<ConfirmRoute
								verified={<Navigate to='/dashboard' />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Login />}
							/>
						}
					/>
					<Route
						path='/'
						element={
							<ConfirmRoute
								verified={<Navigate to='/dashboard' />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Navigate to='/login' />}
							/>
						}
					/>
					<Route
						path='/dashboard'
						element={
							<ConfirmRoute
								verified={<Dashboard />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Navigate to='/login' />}
							/>
						}
					/>
					<Route
						path='/support'
						element={
							<ConfirmRoute
								verified={<Support />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Navigate to='/login' />}
							/>
						}
					/>
					<Route
						path='/settings/account/profile'
						element={
							<ConfirmRoute
								verified={<Profile />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Navigate to='/login' />}
							/>
						}
					/>
					<Route
						path='*'
						element={
							<ConfirmRoute
								verified={<Navigate to='/dashboard' />}
								unverified={<Navigate to='/confirm' />}
								notLoggedIn={<Navigate to='/login' />}
							/>
						}
					/>
				</Routes>
			</Router>
			{/* </React.StrictMode> */}
		</>
	);
}

export default App;
