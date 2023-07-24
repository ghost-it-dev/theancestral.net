import { getPostById } from '@/src/app/actions/posts'
import ErrorMessage from '@/src/components/ErrorMessage'
import { hasError } from '@/src/lib/hasError'
import { SpinnerCircular } from 'spinners-react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import MDViewer from '@/src/components/MDViewer';

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
						<div className='border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center'>
							<div className='flex flex-col w-full'>
								<div className='flex justify-between items-center'>
									<h1 className='flex-1 text-gray-200 text-lg font-medium'>{post.title}</h1>
									<div className='flex flex-col'>
										<div className='flex gap-2'>
											<PencilSquareIcon className='cursor-pointer transition-colors h-5 w-5 text-gray-300 hover:text-indigo-600' />
											<TrashIcon className='cursor-pointer transition-colors h-5 w-5 text-gray-300 hover:text-red-600' />
										</div>
									</div>
								</div>
								<div className='flex justify-between items-center'>
									<p className='text-gray-400 text-sm'>Posted by {post.authorName}</p>
									<div className='mt-1 flex flex-row gap-1'>
										<span className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300'>Ubuntu</span>
										<span className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300'>Linux</span>
									</div>
								</div>
							</div>
						</div>
						<div className='my-4 xl:my-6 px-4 text-gray-200'>
							<MDViewer text={post.description} />
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
