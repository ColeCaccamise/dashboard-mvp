import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SidebarLink({ link, text, active = false, icon }) {
	return (
		<Link to={link}>
			<div className='group flex gap-4 p-2 rounded-md hover:bg-neutral-800 transition duration-150'>
				<span className='text-gray-500 group-hover:text-white transition duration-150'>
					<FontAwesomeIcon icon={icon} />
				</span>
				<span className='text-white'>{text}</span>
			</div>
		</Link>
	);
}

export default SidebarLink;
