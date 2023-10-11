import classNames from 'classnames';

function ErrorMessage({ message, className }: { message: string; className?: string }) {
  return (
    <div>
      <div
        className={classNames(
          'px-2 py-1 rounded-md border-l-2 border-red-400 bg-red-400 bg-opacity-20 text-opacity-100 text-white rounded-l-none w-full h-auto',
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
