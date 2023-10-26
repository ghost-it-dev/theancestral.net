'use client';
import { startTransition, useState } from 'react';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Button from '../Button';
import { UserCreateOrUpdateData, userCreateOrUpdateSchema } from '@/src/actions/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { hasError } from '@/src/lib/response';
import { createUser } from '@/src/actions/user';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Label } from '../Label';
import classNames from 'classnames';


function CreateUserModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [error, setError] = useState<null | string>(null);

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<UserCreateOrUpdateData>({ resolver: zodResolver(userCreateOrUpdateSchema) });

	const { field: roleField } = useController({
		name: 'role',
		control,
		defaultValue: 'user',
	});

	const handleCreateUser = handleSubmit(data => {
		startTransition(() => {
			createUser(data).then(res => {
				if (hasError(res)) return setError(res.error);

				reset();
				setOpen(false);
			});
		});
	});

	return (
		<Modal isOpen={open} setIsOpen={setOpen}>
			{error && <ErrorMessage className='mb-2' message={error} />}
			<span className='text-xl font-semibold text-white'>Create User</span>
			<form onSubmit={handleCreateUser} className='mt-2 flex flex-col gap-2' autoComplete='off'>
				<Input type='email' label='Email' {...register('email')} error={errors.email} />
				<Input type='text' label='Username' {...register('username')} error={errors.username} />
				<Input type='password' label='Password' {...register('password')} error={errors.password} autoComplete='false' />
				<Label label='Role'>
					<Listbox value={roleField.value} onChange={roleField.onChange}>
						<div className="relative z-50">
							<Listbox.Button className={({ open }) => classNames(open ? 'border-indigo-600' : 'border-transparent', 'text-left block w-full rounded-md border-2 border-transparent bg-[#364150] px-3 py-2 font-normal leading-5 text-gray-200 placeholder-gray-200 outline-none ring-0 focus:border-indigo-600 visited:border-indigo-600 focus:ring-0 active:border-indigo-600 sm:text-sm')}>
								<span className="block capitalize">{roleField.value}</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon
										className="h-5 w-5 text-gray-200"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>
							{/* Use static and useState to close the menu when a option is selected */}
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#4B5563] py-1 shadow-md text-sm">
								{['user', 'admin'].map((role, index) => (
									<Listbox.Option
										key={index}
										className={'flex items-center gap-1 px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-[#1E2936] cursor-pointer'}
										value={role}
									>
										<span className={'font-normal capitalize'}>
											{role}
										</span>
									</Listbox.Option>
								))}
							</Listbox.Options>
						</div>
					</Listbox>
				</Label>
				<Button type='submit' className='mt-2 w-full'>
					Create
				</Button>
			</form>
		</Modal>
	);
}

export default CreateUserModal;
