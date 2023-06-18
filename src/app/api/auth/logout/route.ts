import dbConnect from '@/src/lib/dbConnection';
import User from '@/src/models/User';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// POST /api/auth/logout
// Logs out a user
export async function POST() {
	dbConnect();

	const [accessToken, refreshToken] = [cookies().get('token')?.value, cookies().get('refreshToken')?.value]
	if (!accessToken && !refreshToken) return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
	const user = await User.findOne({ refreshToken: refreshToken });

	cookies().set('token', '', { httpOnly: true });
	cookies().set('refreshToken', '', { httpOnly: true });

	if (user) {
		user.refreshToken = user.refreshToken.filter((rt: string) => rt !== refreshToken);
		await user.save();
	}

	return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
};