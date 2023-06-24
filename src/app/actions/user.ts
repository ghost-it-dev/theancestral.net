'use server'
import User from "@/src/models/User";
import { cookies, headers } from 'next/headers'
import { UserType } from '../types/User';
import dbConnect from "@/src/helpers/dbConnection";
import Session from "@/src/models/Session";
import mongoose from "mongoose";

// Return the user object if the user is logged in, otherwise return null
// Do all redirecting on the backend so we don't have to write a function on the frontend
async function getUserFromSession(): Promise<UserType | null> {
	dbConnect();
	const sessionCookie = cookies().get('session')?.value
	const isValidSession = mongoose.isValidObjectId(sessionCookie)
	const session = await Session.findOne({ _id: isValidSession ? sessionCookie : null })
	if (!session) return null
	const user = await User.findById(session.userID).select(['-password', '-session'])

	if (session && session?.userAgent !== headers().get('user-agent')) {
		await Session.findByIdAndDelete(sessionCookie)
		return null
	}

	if (!user) return null
	return user
}

// Return the role of the user making the request
// This should only be called from a server action not the frontend
async function getRequestRole(): Promise<UserType['role']> {
	const user = await getUserFromSession()
	return user?.role || 'guest'
}

export { getUserFromSession, getRequestRole }