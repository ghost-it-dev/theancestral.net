import dbConnect from '@/src/lib/dbConnection';
import User from '@/src/models/User';
import { NextResponse, NextRequest } from 'next/server';

// GET /api/user
// Get the logged in users data
export async function GET(req: NextRequest) {
	dbConnect();
	const user = await User.findOne({ refreshToken: req.cookies.get('refreshToken')?.value }).select(['-password', '-refreshToken']);

	return NextResponse.json(user, { status: 200 })
};