import React from 'react';
import SidebarLink from './SidebarLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGear,
	faLifeRing,
	faChartBar,
	faChevronLeft,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import SettingsDivider from './SettingsDivider';
import SettingsLink from './SettingsLink';

function SettingsSidebar() {
	return (
		<aside className='w-1/5 p-4 flex flex-col justify-between'>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-4 items-center'>
					<Icon url='/dashboard' icon={faChevronLeft} />
					<h2 className='text-white font-bold'>Settings</h2>
				</div>

				<nav>
					<SettingsDivider icon={faUserCircle} text='My Account' />

					<SettingsLink text='Profile' group='account' page='profile' />
				</nav>
			</div>

			<SidebarLink link='/support' text='Help & Support' icon={faLifeRing} />
		</aside>
	);
}

export default SettingsSidebar;
