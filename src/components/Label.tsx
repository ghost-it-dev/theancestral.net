import classNames from 'classnames';
import React, { forwardRef, ComponentProps } from 'react';

export interface LabelProps extends Omit<ComponentProps<'label'>, 'ref' | 'className'> {
  label: string;
  className?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ label, className, children, ...labelProps }, ref) => {
  return (
    <label ref={ref} {...labelProps} className={classNames('flex flex-col flex-nowrap items-stretch gap-1', className)}>
      <div className='select-none text-sm font-bold text-gray-200'>{label}</div>
      {children ? <div className='select-none text-xs font-bold text-gray-200'>{children}</div> : null}
    </label>
  );
});

Label.displayName = 'Label';
