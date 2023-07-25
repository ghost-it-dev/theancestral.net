'use client'
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import { Label } from '@/src/components/Label';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

function Page() {
	const [description, setDescription] = useState<string | undefined>();
	const [isPublic, setIsPublic] = useState<boolean>(false);

	return (
		<div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
			<div className='border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center'>
				<div className='flex flex-col flex-1'>
					<h1 className='flex-1 text-gray-200 text-2xl font-medium'>Create Post</h1>
					{isPublic ?
						<div onClick={() => setIsPublic(!isPublic)} className='flex items-center gap-1 cursor-pointer'>
							<LockOpenIcon className='h-4 w-4 text-gray-300' />
							<span className='text-gray-300 font-semibold text-base select-none'>Public</span>
						</div>
						:
						<div onClick={() => setIsPublic(!isPublic)} className='flex items-center gap-1 cursor-pointer'>
							<LockClosedIcon className='h-4 w-4 text-gray-300' />
							<span className='text-gray-300 font-semibold text-base select-none'>Private</span>
						</div>
					}
				</div>
				<div className='flex gap-2'>
					<Button>Save as draft</Button>
					<Button>Post</Button>
				</div>
			</div>
			<div className='px-4 my-4 xl:my-6 flex flex-col gap-2'>
				<div className='grid grid-cols-2 gap-2'>
					<Input label='Title' />
					<Input label='Labels' />
				</div>
				<div>
					<Label className='mb-1' label={'Description'} />
					<MDEditor
						value={description}
						onChange={setDescription}
						visibleDragbar={false}
						previewOptions={{
							rehypePlugins: [rehypeSanitize],
						}}
					/>
				</div>
			</div>
		</div>
	)

}

export default Page
