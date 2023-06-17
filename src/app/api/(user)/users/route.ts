import User from '@/src/app/models/User';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

// GET /api/user
// Get all users
export async function GET(_req: NextRequest) {
	const users = await User.find()

	return NextResponse.json(users, { status: 200 })
};

// POST /api/users
// Create a new user
export async function POST(req: NextRequest) {
	const body = await req.json();
	const existingUser = await User.findOne({ email: body.email });

	if (!body.email || !body.password || !body.username || !body.name) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
	if (existingUser) return NextResponse.json({ message: 'User with that email already exists' }, { status: 400 });

	const user = new User({
		username: body.username,
		email: body.email,
		password: body.password,
		name: body.name
	});

	try {
		await user.save();
		return NextResponse.json({ message: 'User created successfully' }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: 'Error creating user' }, { status: 500 })
	}
}