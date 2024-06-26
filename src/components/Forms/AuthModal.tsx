'use client';
import { useState, useTransition } from 'react';
import { login } from '@/src/actions/auth';
import { LoginFormData, loginSchema } from '@/src/actions/validations/auth';
import { hasError } from '@/src/lib/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal';
import Input from '@/src/components/Input';
import ErrorMessage from '@/src/components/ErrorMessage';

function AuthModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        setIsOpen(false);
      });
    });
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {error && <ErrorMessage className='mb-2' message={error} />}
      <span className='text-xl font-semibold text-white'>Log In</span>
      <form onSubmit={handleLogin} className='mt-2 flex flex-col gap-2'>
        <Input label='Email' error={errors.email} {...register('email')} type='email' />
        <Input label='Password' error={errors.password} {...register('password')} type='password' />
        <Button type='submit' disabled={isPending}>
          Log In
        </Button>
      </form>
    </Modal>
  );
}

export default AuthModal;
