import React from 'react';
import NavbarButtons from './NavbarButtons';
import { getUserFromSession } from '../app/actions/user';

async function Navbar() {
	const user = await getUserFromSession();

	return (
		<>
			<nav className='flex-shrink-0 bg-[#1E2936] border-b border-[#4B5563]'>
				<div className='mx-auto max-w-7xl px-4 sm:px-8'>
					<div className='relative flex h-14 items-center justify-between'>
						<div className='flex flex-row items-center'>
							{/* <div className='px-3 border-r-2 border-[#465160]'>
								<Bars3Icon className='h-5 w-5 text-gray-100' />
							</div>
							<div className='pl-3 gap-1 flex flex-row items-center'>
								{breadcrumbs}
							</div> */}
						</div>
						<NavbarButtons user={user} />
					</div>
				</div>
			</nav>
		</>
	)
};

export default Navbar;
Navbar.displayName = 'Navbar';