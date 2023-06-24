import { getPostById } from '@/src/app/actions/posts'
import { hasError } from '@/src/lib/hasError'

interface PageProps {
	params: { postId: string }
}

async function Page({ params }: PageProps) {
	const post = await getPostById(params.postId)

	// render error better
	if (hasError(post)) {
		return <div>{post.error}</div>
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.description}</p>
		</div>
	)

}

export default Page
