import React from 'react';
import SidebarLink from './SidebarLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGear,
	faLifeRing,
	faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function AppSidebar() {
	const { user, setUser } = useAuthContext();

	return (
		<aside className='w-1/5 p-4 flex flex-col justify-between max-w-xs'>
			<div className='flex flex-col gap-4'>
				<div>
					<h2 className='text-white font-bold'>Dashboard MVP</h2>
				</div>

				<div className='flex justify-between'>
					<div className='flex items-center gap-4'>
						<img
							src={
								user?.profileImage ||
								'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
							}
							alt={`${user.name}`}
							className='w-10 h-10 rounded-full object-cover'
						/>
						<p className='text-white font-light'>{user.name}</p>
					</div>
					<div className='flex items-center text-gray-500 cursor-pointer transition duration-150 hover:text-white'>
						<Link to='/settings/account/profile'>
							<FontAwesomeIcon icon={faGear} />
						</Link>
					</div>

					{/* <div>
						<ul className='bg-neutral-700 absolute'>
							<li className='text-white'>Billing</li>
						</ul>
					</div> */}
				</div>

				<nav>
					<SidebarLink link='/dashboard' text='Dashboard' icon={faChartBar} />
				</nav>
			</div>

			<SidebarLink link='/support' text='Help & Support' icon={faLifeRing} />
		</aside>
	);
}

export default AppSidebar;
