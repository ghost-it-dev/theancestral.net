
function ErrorMessage({ message }: { message: string }) {

	return (
		<div className="p-2">
			<div className="px-2 py-1 bg-red-400 w-full h-auto">
				{message}
			</div>
		</div>
	)
}

export default ErrorMessage
ErrorMessage.displayName = 'ErrorMessage'