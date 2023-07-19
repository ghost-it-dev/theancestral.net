import { getPostById } from '@/src/app/actions/posts'
import ErrorMessage from '@/src/components/ErrorMessage'
import { hasError } from '@/src/lib/hasError'
import { SpinnerCircular } from 'spinners-react'

interface PageProps {
	params: { postId: string }
}

async function Page({ params }: PageProps) {
	const post = await getPostById(params.postId)

	// render error better
	if (hasError(post)) {
		return <ErrorMessage message={post.error} />
	}

	return (
		<div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
			<>
				{post ?
					<>
						<div className='border-b border-t border-[#1F2C37] p-4 xl:border-t-0'>
							<div className='flex flex-col'>
								<h1 className='flex-1 text-gray-200 text-lg font-medium'>{post.title}</h1>
								<p className='text-gray-400 text-sm'>Posted by {post.authorName}</p>
								<div className='mt-1 flex flex-row gap-1'>
									<span className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300'>Ubuntu</span>
									<span className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300'>Linux</span>
								</div>
							</div>
						</div>
						<div className='my-4 px-4 text-gray-200'>
							{/* Use marked to display mardown here, other lib is slow as fuck */}
							{post.description}
						</div>
					</>
					:
					<div className='flex h-full items-center justify-center'>
						<SpinnerCircular size={75} thickness={150} secondaryColor='rgba(0, 0, 0, .2)' color='#fff' />
					</div>
				}
			</>
		</div>
	)

}

export default Page
