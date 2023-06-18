import React, { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { Label } from './Label';

interface TextAreaProps extends Omit<ComponentProps<'textarea'>, 'ref' | 'className'> {
	label?: string;
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, ...props }, ref) => {
		return (
			<>
				{label ?
					<Label label={label}>
						<textarea
							ref={ref}
							{...props}
							className='block w-full rounded-md border-2 border-transparent bg-[#364150] py-2 px-3 leading-5 text-gray-300 placeholder-gray-300 sm:text-sm ring-0 outline-none focus:ring-0 active:border-indigo-600 focus:border-indigo-600 resize-none'
						/>
					</Label>
					:
					<textarea
						ref={ref}
						{...props}
						className='block w-full rounded-md border-2 border-transparent bg-[#364150] py-2 px-3 leading-5 text-gray-300 placeholder-gray-300 sm:text-sm ring-0 outline-none focus:ring-0 active:border-indigo-600 focus:border-indigo-600 resize-none'
					/>
				}
			</>
		);
	}
);