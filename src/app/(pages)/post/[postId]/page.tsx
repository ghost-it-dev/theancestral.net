import { FC } from 'react'

interface PageProps {
	params: { postId: string }
}

const Page: FC<PageProps> = ({ params }) => {
	return <div>{params.postId}</div>
}

export default Page
