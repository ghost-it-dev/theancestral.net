import { FC } from 'react'

interface PageProps {
	params: { userId: string }
}

const Page: FC<PageProps> = ({ params }) => {
	return <div>{params.userId}</div>
}

export default Page
