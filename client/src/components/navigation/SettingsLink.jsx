import React from 'react';
import { Link } from 'react-router-dom';

function SettingsLink({ text, group, page }) {
	const active =
		window.location.pathname === `/settings/${group}/${page}`
			? 'bg-neutral-800 hover:bg-neutral-800'
			: '';

	return (
		<Link to={`/settings/${group}/${page}`}>
			<div className={`p-1 rounded-sm hover:bg-neutral-900 ${active}`}>
				<span className='text-white'>{text}</span>
			</div>
		</Link>
	);
}

export default SettingsLink;
