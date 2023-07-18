'use server'

import dbConnect from '@/src/helpers/dbConnection';
import Session from '@/src/models/Session';
import User from '@/src/models/User';
import argon2id from 'argon2';
import { cookies, headers } from 'next/headers';
import env from '@/src/lib/env';
import { LoginFormData } from './validations/auth';


async function login(data: LoginFormData) {
	if (!data.email || !data.password) return { error: 'Missing email or password' }
	dbConnect();

	const user = await User.findOne({ email: data.email })
	if (!user) return { error: 'User not found' }

	const validPassword = await argon2id.verify(user.password, data.password)
	if (!validPassword) return { error: 'Invalid password' }

	// Don't allow the user to spam this function and create a ton of sessions
	if (cookies().get('session')) {
		const session = await Session.findById(cookies().get('session')?.value)
		if (session) {
			return { message: 'Already logged in' }
		}
	}

	const session = await Session.create({
		userID: user._id,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // Add 30 days (1000 milliseconds * 60 seconds)
		userAgent: headers().get('user-agent')
	})

	await session.save()

	cookies().set('session', session._id, { expires: session.expiresAt, httpOnly: true, path: '/', sameSite: 'strict', secure: env.APP_MODE === 'production' })
	return { message: 'Successfully logged in' }
}

async function logout() {
	cookies().set('session', '', { expires: new Date(0), httpOnly: true, path: '/', sameSite: 'strict', secure: env.APP_MODE === 'production' })
	if (!cookies().get('session') || cookies().get('session')?.value === '') return { message: 'Successfully logged out' }

	dbConnect();
	const session = await Session.findById(cookies().get('session')?.value)
	if (!session) return { message: 'Successfully logged out' }

	await session.delete()
	return { message: 'Successfully logged out' }
}

export { login, logout };
