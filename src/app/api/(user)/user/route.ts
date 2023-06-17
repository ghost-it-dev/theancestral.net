import dbConnect from '@/src/app/lib/dbConnection';
import User from '@/src/app/models/User';
import { NextResponse, NextRequest } from 'next/server';

// GET /api/user
// Get the logged in users data
export async function GET(req: NextRequest) {
	dbConnect();
	const user = await User.findOne({ refreshToken: req.cookies.get('refreshToken') }).select(['-password', '-refreshToken']);

	return NextResponse.json(user, { status: 200 })
};