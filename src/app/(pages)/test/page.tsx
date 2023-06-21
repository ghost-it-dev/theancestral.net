import Button from "@/src/components/Button"
import { validateSession } from "@/src/app/actions/auth"

export default async function Home() {
	// Use this for protected routes
	await validateSession(['admin', 'user'])
	return (
		<>
			<Button>Test</Button>
		</>
	)
}
