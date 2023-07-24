'use client'
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import { Label } from '@/src/components/Label';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

function Page() {
	const [description, setDescription] = useState<string | undefined>();

	return (
		<div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
			<div className='border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center'>
				<h1 className='flex-1 text-gray-200 text-2xl font-medium'>Create Post</h1>
				<div className='flex gap-2'>
					<Button>Save as draft</Button>
					<Button>Post</Button>
				</div>
			</div>
			<div className='px-4 my-4 xl:my-6'>
				<Input label='Title' />
				{/* <Label label={'Description'} />
				<MDEditor
					className='h-full mt-1'
					value={description}
					onChange={setDescription}
					visibleDragbar={false}
					previewOptions={{
						rehypePlugins: [rehypeSanitize],
					}}
				/> */}
			</div>
		</div>
	)

}

export default Page
