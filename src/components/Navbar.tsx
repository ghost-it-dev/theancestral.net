import React, { useState, ReactNode } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Form, Formik, FormikHelpers } from 'formik';
import Field from './Field';
import { object, string } from 'yup';
import { User } from '../app/types/User';

interface LoginValues {
	email: User['email'];
	password: string;
}

function Navbar({ breadcrumbs }: { breadcrumbs?: ReactNode }) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<any>();


	return (
		<>
			{/* <Modal isOpen={open} setIsOpen={setOpen}>
				<span className='text-white text-xl font-semibold'>Log In</span>
				<Formik
					onSubmit={submit}
					initialValues={{ email: '', password: '' }}
					validationSchema={object().shape({
						email: string().required('An email must be provided.').email('Please enter a valid email address.'),
						password: string().required('Please enter your account password.'),
					})}>
					<Form>
						{error &&
							<div className='mt-4 px-2 py-1 bg-indigo-600 bg-opacity-40 border-l-4 border-indigo-600 rounded rounded-l-none text-white font-semibold'>
								{error}
							</div>
						}
						<div className='flex flex-col gap-2 mt-4'>
							<Field id='email' name='email' type='email' placeholder='Email' />
							<Field id='password' type='password' name='password' placeholder='Password' />
							<Button type='submit'>Login</Button>
						</div>
					</Form>
				</Formik>
			</Modal> */}
			<nav className='flex-shrink-0 bg-[#1E2936] border-b border-[#4B5563]'>
				<div className='mx-auto max-w-7xl px-4 sm:px-8'>
					<div className='relative flex h-14 items-center justify-between'>
						<div className='flex flex-row items-center'>
							<div className='px-3 border-r-2 border-[#465160]'>
								<Bars3Icon className='h-5 w-5 text-gray-100' />
							</div>
							<div className='pl-3 gap-1 flex flex-row items-center'>
								{breadcrumbs}
							</div>
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