import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function OAuthButton({ mode = 'register' }) {
	const modeText = mode === 'register' ? 'Register' : 'Login';

	return (
		<div className='cursor-wait bg-[#575BC7] text-[#FEFEFF] py-4 flex justify-center items-center font-light text-base rounded-md transition-opacity duration-300 hover:opacity-80'>
			<div className='flex gap-4'>
				<span>
					<FontAwesomeIcon icon={faGoogle} />
				</span>
				<span>{modeText} with Google (coming soon)</span>
			</div>
		</div>
	);
}

export default OAuthButton;
