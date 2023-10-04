'use client';
import { startTransition, useState, useTransition } from 'react';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import { UserInterface } from '@/src/models/User';
import Input from '../Input';
import Button from '../Button';
import { UpdatePasswordData, updatePasswordSchema } from '@/src/actions/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updatePassword } from '@/src/actions/user';
import { hasError } from '@/src/lib/response';
import { logout } from '@/src/actions/auth';
import { redirect } from 'next/navigation';

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
      {error && <ErrorMessage className="mb-2" message={error} />}
      <span className="text-white text-xl font-semibold">Update Password</span>
      <form onSubmit={handleUpdatePassword} className="flex flex-col gap-2 mt-2">
        <Input label="Current Password" error={errors.currentPassword} {...register('currentPassword')} />
        <Input label="New Password" error={errors.newPassword} {...register('newPassword')} />
        <Input label="Confirm New Password" error={errors.confirmNewPassword} {...register('confirmNewPassword')} />
        <Button type="submit" className="w-full mt-2">
          Update
        </Button>
      </form>
    </Modal>
  );
}

export default UpdatePasswordModal;
