import User from '@/src/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import env from '@/src/lib/env';
import { cookies } from 'next/headers'
import dbConnect from '@/src/lib/dbConnection';

// POST /api/auth/login
// Logs in a user
export async function POST() {
	dbConnect();
	if (cookies().get('refreshToken') === undefined) return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
	const user = await User.findOne({ refreshToken: cookies().get('refreshToken')?.value });

	// Detect if the refresh token is being reused
	if (!user && cookies().get('refreshToken')?.value !== undefined) {
		cookies().set('token', '', { httpOnly: true });
		cookies().set('refreshToken', '', { httpOnly: true });

		jwt.verify(cookies().get('refreshToken')?.value ?? '', env.JWT_SECRET, async (err: any, decoded: any) => {
			if (err) {
				return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
			}
			// We assume this user is compromised and we delete all of its refresh tokens
			const invalidUser = await User.findOne({ _id: decoded.id });
			if (invalidUser) {
				invalidUser.refreshToken = [];
				await invalidUser.save();
				return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
			}
		});
	}

	const newRefreshTokenArray = user.refreshToken.filter((rt: string) => rt !== cookies().get('refreshToken')?.value);

	jwt.verify(cookies().get('refreshToken')?.value ?? '', env.JWT_SECRET, async (err: any, decoded: any) => {
		if (err) {
			user.refreshToken = [...newRefreshTokenArray];
			try {
				await user.save();
			} catch (err) {
				return NextResponse.json({ message: 'Error verifying account' }, { status: 500 });
			}
		}

		if (err || user.id !== decoded.id) return NextResponse.json({ message: err }, { status: 401 });

		const accessToken = jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + 60 }, env.JWT_SECRET);
		const newRefreshToken = jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + 60 }, env.JWT_SECRET);

		user.refreshToken = [...newRefreshTokenArray, newRefreshToken];

		try {
			await user.save();
			cookies().set('token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 1 * 60 * 60 * 1000) });
			cookies().set('refreshToken', newRefreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
			return NextResponse.json({}, { status: 200 });
		} catch (err) {
			return NextResponse.json({ message: 'Error verifying account' }, { status: 500 });
		}
	});
};