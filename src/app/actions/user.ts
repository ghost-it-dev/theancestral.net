'use server'

import User from "@/src/models/User";
import { cookies } from "next/headers";
import { UserType } from "../types/User";

// Return the user object if the user is logged in, otherwise return null
async function getUser(): Promise<UserType | null> {
	const user = await User.findOne({ session: cookies().get('session')?.value }).select(['-password', '-session'])
	if (!user) return null

	return user
}

// Return the role of the user making the request
async function getRequestRole(): Promise<UserType['role']> {
	const user = await getUser()
	if (!user) return 'guest'

	return user.role
}

export { getUser, getRequestRole }