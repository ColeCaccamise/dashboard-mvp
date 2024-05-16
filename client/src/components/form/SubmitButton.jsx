import React from 'react';

function OAuthButton({ text }) {
	return (
		<input
			type='submit'
			className='cursor-pointer bg-[#1E2025] text-[#FEFEFF] py-3 flex justify-center items-center font-light text-base rounded-md transition-opacity duration-300 hover:opacity-80'
			value={text}
		/>
	);
}

export default OAuthButton;
