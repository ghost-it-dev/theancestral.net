import React from 'react';
import { cva, VariantProps } from 'cva';
import ButtonOrLink, { ButtonOrLinkProps } from './ButtonOrLink';
import classNames from 'classnames';
import { SpinnerCircular } from 'spinners-react';

const buttonStyles = cva(
	'relative inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none transition-all ease-linear',
	{
		variants: {
			variant: {
				accent: 'bg-indigo-600 hover:bg-indigo-700 text-white',
				red: 'bg-red-600 hover:bg-red-700 text-white',
				gray: 'bg-[#364150] hover:bg-[#465160] text-gray-200'
			},
			isLoading: {
				true: `text-transparent cursor-not-allowed`,
			}
		},
		defaultVariants: {
			variant: 'accent',
		},
	}
);

interface Props extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> { }

const Button: React.FC<Props> = ({ variant, isLoading, className, ...props }) => {
	return (
		<>
			{isLoading ? (
				<ButtonOrLink className={classNames(buttonStyles({ variant, isLoading }), className)} {...props}>
					<div className='flex justify-center items-center w-full h-full left-0 top-0'>
						<SpinnerCircular size={20} thickness={200} secondaryColor='rgba(0, 0, 0, .2)' color='#fff' />
					</div>
				</ButtonOrLink>
			) : (
				<ButtonOrLink className={classNames(buttonStyles({ variant, isLoading }), className)} {...props} />
			)}
		</>
	);
};

export default Button;