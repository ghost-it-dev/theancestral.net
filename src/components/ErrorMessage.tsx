import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

function ErrorMessage({ message, className }: { message: string; className?: string }) {
  return (
    <div className={className}>
      <div
        className={'flex h-auto w-full items-center gap-1 rounded-md bg-[#4B5563] px-2 py-1 font-semibold text-red-300'}
      >
        <ExclamationCircleIcon className='h-5 w-5' />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default ErrorMessage;
ErrorMessage.displayName = 'ErrorMessage';
