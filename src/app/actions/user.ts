'use server'

import User from "@/src/models/User";
import { cookies } from 'next/headers';
import { UserType } from '../types/User';
import dbConnect from "@/src/helpers/dbConnection";

// Return the user object if the user is logged in, otherwise return null

// Write more validations for this
// Find the session
// match the user agent and delte if they mismatch
// if the client provides a session cookie that doesn't exist in the database, delete the cookie
// This will pretty much be like our validateSession function, do all the redirecting on the backend

async function getUser(): Promise<UserType | null> {
	dbConnect();
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