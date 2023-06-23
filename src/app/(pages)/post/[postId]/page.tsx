import { getPost } from '@/src/app/actions/posts'

interface PageProps {
	params: { postId: string }
}

async function Page({ params }: PageProps) {
	const post = await getPost(params.postId)

	return (
		<div>{post?.title}</div>
	)
}

export default Page
