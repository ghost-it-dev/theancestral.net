'use client';
import { startTransition, useState } from 'react';
import Modal from '@/src/components/Modal';
import ErrorMessage from '@/src/components/ErrorMessage';
import { UserInterface } from '@/src/models/User';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { UpdatePasswordData, updatePasswordSchema } from '@/src/actions/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updatePassword } from '@/src/actions/user';
import { hasError } from '@/src/lib/response';
import { logout } from '@/src/actions/auth';

function UpdatePasswordModal({
  user,
  open,
  setOpen,
}: {
  user: Omit<UserInterface, 'password'>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordData>({ resolver: zodResolver(updatePasswordSchema) });

  const handleUpdatePassword = handleSubmit(data => {
    startTransition(() => {
      updatePassword(data, user._id).then(res => {
        if (hasError(res)) return setError(res.error);

        logout();
      });
    });
  });

  return (
    <Modal isOpen={open} setIsOpen={setOpen}>
      {error && <ErrorMessage className='mb-2' message={error} />}
      <span className='text-xl font-semibold text-white'>Update Password</span>
      <form onSubmit={handleUpdatePassword} className='mt-2 flex flex-col gap-2'>
        <Input label='Current Password' error={errors.currentPassword} {...register('currentPassword')} />
        <Input label='New Password' error={errors.newPassword} {...register('newPassword')} />
        <Input label='Confirm New Password' error={errors.confirmNewPassword} {...register('confirmNewPassword')} />
        <Button type='submit' className='mt-2 w-full'>
          Update
        </Button>
      </form>
    </Modal>
  );
}

export default UpdatePasswordModal;
