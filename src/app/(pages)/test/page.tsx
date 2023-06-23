import Button from "@/src/components/Button"
import { validateSession } from "@/src/app/actions/auth"

export default async function Home() {
	console.log(await validateSession(['admin', 'user'], true))
	return (
		<>
			<Button>Test</Button>
		</>
	)
}
