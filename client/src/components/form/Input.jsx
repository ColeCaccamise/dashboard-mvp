import React from 'react';

function Input({
	type = 'text',
	placeholder = '',
	error = false,
	onChange,
	autoFocus = false,
	onKeyUp,
	className,
	value,
}) {
	if (type === 'image') {
		return (
			<input
				className={
					className
						? className
						: `w-full p-2 rounded-sm bg-[#09090a] border-2 text-white ${
								error ? 'border-[#a53636]' : 'border-[#1E2025]'
						  } focus:border-[#2b2d61] focus:outline-none transition duration-150 ease-in-out`
				}
				onChange={onChange}
				onKeyUp={onKeyUp}
				type='file'
				accept='image/jpeg image/png image/gif image/webp'
				placeholder={placeholder}
				autoFocus={autoFocus}
				value={value}
			/>
		);
	}
	return (
		<input
			className={
				className
					? className
					: `w-full p-2 rounded-sm bg-[#09090a] border-2 text-white ${
							error ? 'border-[#a53636]' : 'border-[#1E2025]'
					  } focus:border-[#2b2d61] focus:outline-none transition duration-150 ease-in-out`
			}
			onChange={onChange}
			onKeyUp={onKeyUp}
			type={type}
			placeholder={placeholder}
			autoFocus={autoFocus}
			value={value}
		/>
	);
}

export default Input;
