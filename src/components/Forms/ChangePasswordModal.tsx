'use client';
import { useState } from 'react';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import { UserInterface } from '@/src/models/User';
import Input from '../Input';
import { EyeIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

function ChangePasswordModal({ user, open, setOpen }: { user: Omit<UserInterface, 'password'>, open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [error, setError] = useState<null | string>(null);

	return (
		<Modal isOpen={open} setIsOpen={setOpen}>
			{error && <ErrorMessage className="mb-2" message={error} />}
			<span className="text-white text-xl font-semibold">Change Password</span>
			<div className='flex flex-col gap-2 mt-2'>
				<Input label='Current Password' />
				<Input label='New Password' />
				<Input label='Confirm New Password' />

			</div>
			<Button className='w-full mt-2'>Update</Button>
		</Modal>
	);
}

export default ChangePasswordModal;
