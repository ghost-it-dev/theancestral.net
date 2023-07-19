import React, { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends Omit<ComponentProps<'input'>, 'ref' | 'className'> {
	error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ error, ...props }, ref) => {
		return (
			<div>
				<input
					ref={ref}
					{...props}
					className='block w-full font-normal rounded-md border-2 border-transparent bg-[#364150] py-2 px-3 leading-5 text-gray-200 placeholder-gray-200 sm:text-sm ring-0 outline-none focus:ring-0 active:border-indigo-600 focus:border-indigo-600'
				/>
				{error &&
					<p className='text-xs text-red-200 mt-0.5'>{error.message}</p>
				}
			</div>
		);
	}
);

export default Input;
Input.displayName = 'Input';