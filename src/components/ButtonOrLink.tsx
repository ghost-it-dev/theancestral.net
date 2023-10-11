import React, { type ComponentProps, forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

export type ButtonOrLinkProps = Omit<Partial<LinkProps> & ComponentProps<'a'> & ComponentProps<'button'>, 'ref'>;

const ButtonOrLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonOrLinkProps>(
  ({ href, ...props }, ref: any) => {
    // Internal router link:
    if (href) {
      return <Link href={href} ref={ref} {...props} />;
    }

    // We set the default type to be "button" to avoid accidentally submitting forms.
    // eslint-disable-next-line react/button-has-type
    return <button {...props} type={props.type || 'button'} ref={ref} />;
  },
);

export default ButtonOrLink;
ButtonOrLink.displayName = 'ButtonOrLink';
