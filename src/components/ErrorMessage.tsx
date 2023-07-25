import classNames from 'classnames'

function ErrorMessage({ message, className }: { message: string, className?: string }) {

	return (
		<div>
			<div className={classNames("px-2 py-1 rounded-sm border-l-4 border-red-400 rounded-l-none bg-[#364150] text-gray-200 rounded-l-0 w-full h-auto", className)}>
				{message}
			</div>
		</div>
	)
}

export default ErrorMessage
ErrorMessage.displayName = 'ErrorMessage'