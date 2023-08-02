'use client';
import { useState, useTransition } from 'react';
import { login } from '@/src/app/actions/auth';
import { LoginFormData, loginSchema } from '@/src/app/actions/validations/auth';
import { hasError } from '@/src/lib/hasError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Modal from '../Modal';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';

function AuthModal({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const handleLogin = handleSubmit(data => {
    startTransition(() => {
      login(data).then(res => {
        if (hasError(res)) return setError(res.error);

        reset();
        setOpen(false);
      });
    });
  });

  return (
    <Modal isOpen={open} setIsOpen={setOpen}>
      {error && <ErrorMessage className="mb-2" message={error} />}
      <span className="text-white text-xl font-semibold">Log In</span>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-2">
        <Input label="Email" error={errors.email} {...register('email')} type="email" />
        <Input label="Password" error={errors.password} {...register('password')} type="password" />
        <Button type="submit" disabled={isPending}>
          Log In
        </Button>
      </form>
    </Modal>
  );
}

export default AuthModal;
