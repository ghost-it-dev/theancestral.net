'use server'

import User from "@/src/models/User";
import { cookies } from "next/headers";
import { UserType } from "../types/User";

async function getUser(): Promise<UserType | null> {
	const user = await User.findOne({ session: cookies().get('session')?.value }).select(['-password', '-session'])
	if (!user) return null

	return user
}

export { getUser }