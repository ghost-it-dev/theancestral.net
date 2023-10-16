import React, { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { Label } from './Label';
import { FieldError } from 'react-hook-form';

interface InputProps extends Omit<ComponentProps<'input'>, 'ref' | 'className'> {
  label?: string;
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <>
      {label ? (
        <div className='flex flex-col'>
          <Label label={label}>
            <input
              ref={ref}
              {...props}
              className='block w-full rounded-md border-2 border-transparent bg-[#364150] px-3 py-2 font-normal leading-5 text-gray-200 placeholder-gray-200 outline-none ring-0 focus:border-indigo-600 focus:ring-0 active:border-indigo-600 sm:text-sm'
            />
          </Label>
          {error && <p className='mt-0.5 text-xs text-red-200'>{error.message}</p>}
        </div>
      ) : (
        <div className='flex flex-col'>
          <input
            ref={ref}
            {...props}
            className='block w-full rounded-md border-2 border-transparent bg-[#364150] px-3 py-2 font-normal leading-5 text-gray-200 placeholder-gray-200 outline-none ring-0 focus:border-indigo-600 focus:ring-0 active:border-indigo-600 sm:text-sm'
          />
          {error && <p className='mt-0.5 text-xs text-red-200'>{error.message}</p>}
        </div>
      )}
    </>
  );
});

export default Input;
Input.displayName = 'Input';
