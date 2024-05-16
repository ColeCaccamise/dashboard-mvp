import React from 'react';

function Input({ type = 'text', placeholder = '', error = false, onChange }) {
	return (
		<input
			className={`w-full p-2 rounded-sm bg-[#0F1011] border-2 text-[#343537] ${
				error ? 'border-[#a53636]' : 'border-[#1E2025]'
			}`}
			onChange={onChange}
			type={type}
			placeholder={placeholder}
		/>
	);
}

export default Input;
