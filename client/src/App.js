import axios from 'axios';
import { useEffect, useState } from 'react';

const getMessage = async () => {
	try {
		const response = await axios.get('/api/v1');
		const data = response.data;
		return data; // Return the JSON object directly
	} catch (error) {
		console.error('Error fetching data:', error);
		return null; // Return null or handle the error as needed
	}
};

function App() {
	const fetchData = async () => {
		const data = await getMessage();
		if (data) {
			return data.message;
		}
	};

	const [message, setMessage] = useState(''); // Call the fetchData function to retrieve data

	useEffect(() => {
		const fetchDataAndSetMessage = async () => {
			const data = await fetchData();
			setMessage(data);
		};

		fetchDataAndSetMessage();
	}, []);
	return (
		<div>
			<h1>Welcome to Dashboard MVP</h1>
			<p>{message}</p>
		</div>
	);
}

export default App;
