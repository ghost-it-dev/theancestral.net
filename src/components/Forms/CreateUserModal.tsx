'use client';
import { startTransition, useState } from 'react';
import Modal from '@/src/components/Modal';
import ErrorMessage from '@/src/components/ErrorMessage';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { hasError } from '@/src/lib/response';
import { createUser } from '@/src/actions/user';
import { Label } from '@/src/components/Label';
import classNames from 'classnames';
import { CreateUserData, createUserSchema } from '@/src/actions/validations/user';

function CreateUserModal({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [error, setError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUserData>({ resolver: zodResolver(createUserSchema) });

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
        setError(null);
        setOpen(false);
      });
    });
  });

  return (
    <Modal isOpen={open} setIsOpen={setOpen}>
      {error && <ErrorMessage className='mb-2' message={error} />}
      <span className='text-xl font-semibold text-white'>Create User</span>
      <form onSubmit={handleCreateUser} className='mt-2 flex flex-col gap-2' autoComplete='off'>
        <Input type='email' label='Email' {...register('email')} error={errors.email} autoComplete='off' />
        <Input type='text' label='Username' {...register('username')} error={errors.username} autoComplete='off' />
        <Input type='password' label='Password' {...register('password')} error={errors.password} autoComplete='off' />
        <Label label='Role'>
          <div className='flex w-full justify-between gap-2'>
            <div
              onClick={() => roleField.onChange('user')}
              className={classNames(
                roleField.value === 'user' ? 'border-indigo-600' : 'border-[#364150]',
                'w-full cursor-pointer rounded-md border-2 bg-transparent px-2 py-1 text-center',
              )}
            >
              <span className='text-lg font-bold'>User</span>
            </div>
            <div
              onClick={() => roleField.onChange('admin')}
              className={classNames(
                roleField.value === 'admin' ? 'border-indigo-600' : 'border-[#364150]',
                'w-full cursor-pointer rounded-md border-2 bg-transparent px-2 py-1 text-center',
              )}
            >
              <span className='text-lg font-bold'>Admin</span>
            </div>
          </div>
        </Label>
        <Button type='submit' className='mt-2 w-full'>
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default CreateUserModal;
