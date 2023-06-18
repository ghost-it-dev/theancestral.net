import User from '@/src/models/User';
import argon2id from 'argon2';
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import env from '@/src/lib/env';
import { cookies } from 'next/headers'
import dbConnect from '@/src/lib/dbConnection';

// POST /api/auth/login
// Logs in a user
export async function POST(req: NextRequest) {
	dbConnect();

	const body = await req.json();
	const refreshToken = cookies().get('refreshToken')?.value;

	if (!body.email || !body.password) return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
	const user = await User.findOne({ email: body.email });
	if (!user) return NextResponse.json({ message: 'User with that email does not exist.' }, { status: 404 });

	const match = await argon2id.verify(user.password, body.password);

	if (match) {
		const accessToken = jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, env.JWT_SECRET);
		const newRefreshToken = jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) }, env.JWT_SECRET);

		let newRefreshTokenArray = !refreshToken ? user.refreshToken : user.refreshToken.filter((rt: string) => rt !== refreshToken);

		if (refreshToken) {
			const user = await User.findOne({ refreshToken: refreshToken });
			if (!user) {
				newRefreshTokenArray = [];
			}
			req.cookies.set('refreshToken', '');
			cookies().set('refreshToken', '', { httpOnly: true });
		}

		user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
		try {
			await user.save();
		} catch (err) {
			return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
		}

		// TODO: add secure: true to cookies before production
		// expires in 1 hour
		cookies().set('token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 1 * 60 * 60 * 1000) })
		// expires in 30 days
		cookies().set('refreshToken', newRefreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })

		return NextResponse.json({}, { status: 200 })
	} else {
		return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
	}
};