import classNames from 'classnames';

function ErrorMessage({ message, className }: { message: string; className?: string }) {
  return (
    <div>
      <div
        className={classNames(
          'h-auto w-full rounded-md rounded-l-none border-l-2 border-red-400 bg-red-400 bg-opacity-20 px-2 py-1 text-white text-opacity-100',
          className,
        )}
      >
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;
ErrorMessage.displayName = 'ErrorMessage';
