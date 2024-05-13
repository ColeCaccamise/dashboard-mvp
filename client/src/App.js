import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get('/api/v1/users')
			.then((res) => {
				const users = res.data.map((user, index) => {
					return <li key={index}>{user.name}</li>;
				});
				setUsers(users);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className='bg-slate-500'>
			<h1>Welcome to Dashboard MVP</h1>
			<h2 className=''>Users:</h2>
			<ul>{users}</ul>
		</div>
	);
}

export default App;
