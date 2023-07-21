import React from 'react';
import NavbarButtons from './NavbarButtons';
import { getUserFromSession } from '../../app/actions/user';
import Breadcrumbs from './Breadcrumbs';

async function Navbar() {
	const user = await getUserFromSession();

	return (
		<>
			<header className='flex-shrink-0 bg-[#1E2936] border-b border-[#4B5563]'>
				<div className='mx-auto max-w-7xl px-4 xl:px-8'>
					<div className='relative flex h-14 items-center justify-between'>
						<div className='flex flex-row items-center'>
							<Breadcrumbs />
						</div>
						<NavbarButtons user={user} />
					</div>
				</div>
			</header>
		</>
	)
};

export default Navbar;
Navbar.displayName = 'Navbar';