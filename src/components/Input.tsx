import React, { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { Label } from './Label';

interface InputProps extends Omit<ComponentProps<'input'>, 'ref' | 'className'> {
	label?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(
	({ label, ...props }, ref) => {
		return (
			<>
				{label ?
					<Label label={label}>
						<input
							ref={ref}
							{...props}
							className='block font-normal w-full rounded-md border-2 border-transparent bg-[#364150] py-2 px-3 leading-5 text-gray-200 placeholder-gray-200 sm:text-sm ring-0 outline-none focus:ring-0 active:border-indigo-600 focus:border-indigo-600'
						/>
					</Label>
					:
					<input
						ref={ref}
						{...props}
						className='block w-full font-normal rounded-md border-2 border-transparent bg-[#364150] py-2 px-3 leading-5 text-gray-200 placeholder-gray-200 sm:text-sm ring-0 outline-none focus:ring-0 active:border-indigo-600 focus:border-indigo-600'
					/>
				}
			</>
		);
	}
);