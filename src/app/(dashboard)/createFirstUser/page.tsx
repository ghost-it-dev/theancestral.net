import { createFirstUser } from "@/src/actions/user"
import { redirect } from "next/navigation"

async function Page() {
	await createFirstUser().finally(() => redirect('/'))

	return <div className="text-white">Creating first user...</div>
}

export default Page
