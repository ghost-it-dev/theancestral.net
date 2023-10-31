import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import ButtonOrLink, { ButtonOrLinkProps } from '@/src/components/ButtonOrLink';
import classNames from 'classnames';
import { SpinnerCircular } from 'spinners-react';

const buttonStyles = cva(
  'relative inline-flex items-center justify-center font-medium text-white shadow-sm focus:outline-none transition-colors ease-linear',
  {
    variants: {
      variant: {
        accent:
          'bg-indigo-600 hover:bg-indigo-700 text-white disabled:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed',
        red: 'bg-red-600 hover:bg-red-700 text-white disabled:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed',
        gray: 'bg-[#364150] hover:bg-[#465160] text-gray-200 disabled:bg-[#465160] disabled:opacity-50 disabled:cursor-not-allowed',
      },
      size: {
        normal: 'px-4 py-2 text-sm rounded-md',
        square: 'p-2 text-xs rounded',
        pagination: 'h-8 w-8 flex items-center justify-center rounded',
      },
      isLoading: {
        true: `text-transparent cursor-not-allowed`,
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'normal',
    },
  },
);

interface Props extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> {}

const Button: React.FC<Props> = ({ variant, size, isLoading, className, ...props }) => {
  return (
    <>
      {isLoading ? (
        <ButtonOrLink className={classNames(buttonStyles({ variant, size, isLoading }), className)} {...props}>
          <div className='left-0 top-0 flex h-full w-full items-center justify-center'>
            <SpinnerCircular size={20} thickness={200} secondaryColor='rgba(0, 0, 0, .2)' color='#fff' />
          </div>
        </ButtonOrLink>
      ) : (
        <ButtonOrLink className={classNames(buttonStyles({ variant, size, isLoading }), className)} {...props} />
      )}
    </>
  );
};

export default Button;
Button.displayName = 'Button';
