'use client'
import React, { useState } from 'react';
import Button from './Button';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Modal from './Modal';
import { login } from '../app/actions/auth';

// DONT USE ASYNC WITH CLIENT COMPONENTS
function Navbar() {
	const [open, setOpen] = useState(false);

	const handleLogin = async () => {
		const res = await login({ email: 'test@test.com', password: 'test' })
		console.log(res)
	}

	return (
		<>
			<Modal isOpen={open} setIsOpen={setOpen}>
				<span className='text-white text-xl font-semibold'>Log In</span>
			</Modal>
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
						{/* When we write this search function just get the posts one time and filter through it, just match strings & filter with tags */}
						<div className='flex flex-row gap-2'>
							<div className='p-2 cursor-pointer flex items-center justify-center rounded-full bg-[#364150] hover:bg-[#465160] transition-all ease-linear'>
								<MagnifyingGlassIcon className='h-5 w-5 text-gray-200' aria-hidden='true' />
							</div>
							<Button onClick={() => setOpen(true)} variant={'gray'}>Login</Button>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
};

export default Navbar;
Navbar.displayName = 'Navbar';