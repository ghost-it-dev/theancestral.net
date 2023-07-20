import { getUserById } from '@/src/app/actions/user'
import ErrorMessage from '@/src/components/ErrorMessage'
import { hasError } from '@/src/lib/hasError'

interface PageProps {
	params: { userId: string }
}

async function Page({ params }: PageProps) {
	const user = await getUserById(params.userId)

	// render error better
	if (hasError(user)) {
		return <ErrorMessage message={user.error} />
	}

	return (
		<div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
			{user.name}
		</div>
	)

}

export default Page
