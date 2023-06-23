'use server'

import User from "@/src/models/User";
import { cookies } from "next/headers";

async function getUser() {
	const user = await User.findOne({ session: cookies().get('session')?.value })
	if (!user) return {}

	return user
}

export { getUser }