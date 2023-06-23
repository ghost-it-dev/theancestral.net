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
// This should only be called from a server action not the frontend
async function getRequestRole(): Promise<UserType['role']> {
	const user = await getUser()
	return user?.role || 'guest'
}

export { getUser, getRequestRole }