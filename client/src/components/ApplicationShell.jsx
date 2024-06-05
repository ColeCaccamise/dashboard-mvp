import React from 'react';

import AppSidebar from './navigation/AppSidebar';
import SettingsSidebar from './navigation/SettingsSidebar';

function ApplicationShell({ mode, children }) {
	switch (mode) {
		case 'settings':
			return (
				<div className='flex justify-between w-full h-full '>
					<SettingsSidebar />
					<main className='flex flex-col items-center flex-grow h-full bg-neutral-900'>
						<div className='w-full text-left p-16'>{children}</div>
					</main>
				</div>
			);
		default:
			return (
				<div className='flex justify-between w-full h-full '>
					<AppSidebar />
					<main className='flex flex-col items-center flex-grow h-full bg-neutral-900'>
						{children}
					</main>
				</div>
			);
	}
}

export default ApplicationShell;
