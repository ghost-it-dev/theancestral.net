'use client'
import React, { useState, useTransition } from 'react';
import Button from './Button';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Modal from './Modal';
import { UserType } from '../app/types/User';
import { useForm } from 'react-hook-form';
import { login } from '../app/actions/auth';
import Input from './Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../app/actions/validations/auth';



function NavbarButtons({ user }: { user: UserType | null }) {
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

	console.log(errors)
	const onSubmit = handleSubmit(async (data) => {
		startTransition(() => {
			login(data);
		});
	});

	return (
		<>
			<Modal isOpen={open} setIsOpen={setOpen}>
				<span className='text-white text-xl font-semibold'>Log In</span>
				<form onSubmit={onSubmit} className='flex flex-col gap-2 mt-2'>
					<Input {...register('email')} placeholder='Email' type='email' />

					<Input {...register('password')} placeholder='Password' type='password' />
					<Button type='submit' disabled={isPending}>Log In</Button>
				</form>
			</Modal>
			<div className='flex flex-row gap-2'>
				<div className='p-2 cursor-pointer flex items-center justify-center rounded-full bg-[#364150] hover:bg-[#465160] transition-all ease-linear'>
					<MagnifyingGlassIcon className='h-5 w-5 text-gray-200' aria-hidden='true' />
				</div>
				<Button onClick={() => setOpen(true)} variant={'gray'}>Login</Button>
			</div >
		</>
	)
};

export default NavbarButtons;
NavbarButtons.displayName = 'NavbarButtons';
