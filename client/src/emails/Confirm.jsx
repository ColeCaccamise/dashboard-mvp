import * as React from 'react';
import { Html, Button, Hr, Text } from '@react-email/components';

function Confirm({ name }) {
	return (
		<Html lang='en'>
			<Text>Confirm your email.</Text>
			<p>{name ? `Hi, ${name}.` : 'Hi.'}</p>
			<p>
				Please confirm your Dashboard MVP account by clicking the button below.
				We're excited to have you.
			</p>
			<Hr />
			<Button href='http://localhost:3000'>Click me</Button>
		</Html>
	);
}

export default Confirm;
