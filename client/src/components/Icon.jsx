import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Icon({ url, icon }) {
	return (
		<div className='flex items-center text-gray-500 cursor-pointer transition duration-150 hover:text-white'>
			<Link to={url}>
				<FontAwesomeIcon icon={icon} />
			</Link>
		</div>
	);
}

export default Icon;
