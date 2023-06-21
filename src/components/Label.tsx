import React, { forwardRef, ComponentProps } from 'react';

export interface LabelProps
	extends Omit<ComponentProps<'label'>, 'ref' | 'className'> {
	label: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ label, children, ...labelProps }, ref) => {
		return (
			<label
				ref={ref}
				{...labelProps}
				className='flex flex-col flex-nowrap items-stretch gap-1'
			>
				<div className='text-sm font-bold text-gray-200'>
					{label}
				</div>
				{children ? (
					<div className='text-xs font-bold text-gray-200'>{children}</div>
				) : null}
			</label>
		);
	}
);

Label.displayName = 'Label';