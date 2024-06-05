import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SettingsDivider({ icon, text }) {
	return (
		<div className='flex gap-2 text-gray-400 mb-2'>
			<span>
				<FontAwesomeIcon icon={icon} />
			</span>
			<span>{text}</span>
		</div>
	);
}

export default SettingsDivider;
