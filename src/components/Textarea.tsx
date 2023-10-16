import React, { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { Label } from './Label';

interface TextAreaProps extends Omit<ComponentProps<'textarea'>, 'ref' | 'className'> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, ...props }, ref) => {
  return (
    <>
      {label ? (
        <Label label={label}>
          <textarea
            ref={ref}
            {...props}
            className='block w-full resize-none rounded-md border-2 border-transparent bg-[#364150] px-3 py-2 leading-5 text-gray-300 placeholder-gray-300 outline-none ring-0 focus:border-indigo-600 focus:ring-0 active:border-indigo-600 sm:text-sm'
          />
        </Label>
      ) : (
        <textarea
          ref={ref}
          {...props}
          className='block w-full resize-none rounded-md border-2 border-transparent bg-[#364150] px-3 py-2 leading-5 text-gray-300 placeholder-gray-300 outline-none ring-0 focus:border-indigo-600 focus:ring-0 active:border-indigo-600 sm:text-sm'
        />
      )}
    </>
  );
});

export default Textarea;
Textarea.displayName = 'Textarea';
