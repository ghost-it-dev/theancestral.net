import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

function ErrorMessage({ message, className }: { message: string; className?: string }) {
  return (
    <div className={className}>
      <div
        className={'h-auto w-full flex items-center gap-1 rounded-md px-2 py-1 bg-[#4B5563] text-red-300 font-semibold'}
      >
        <ExclamationCircleIcon className='h-5 w-5' />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default ErrorMessage;
ErrorMessage.displayName = 'ErrorMessage';
