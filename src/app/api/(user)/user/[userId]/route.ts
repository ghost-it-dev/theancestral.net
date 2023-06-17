import User from '@/src/app/models/User';
import mongoose from 'mongoose';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

// GET /api/user
// Get a specific users data
export async function GET(_req: NextRequest, { params }: { params: { userId: string } }) {
	const user = await User.findOne({ _id: params.userId }).select(['-password', '-refreshToken']);

	return NextResponse.json(user, { status: 200 })
};

// DELETE /api/user
// Delete a user by id
export async function DELETE(_req: NextRequest, { params }: { params: { userId: string } }) {
	if (!mongoose.Types.ObjectId.isValid(params.userId)) return NextResponse.json({ message: 'User not found' }, { status: 404 });
	const user = await User.findById(params.userId);
	if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

	try {
		await User.findByIdAndDelete(params.userId);
		return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: 'Error deleting user' }, { status: 500 })
	}
};

// PATCH /api/user
// Update a user by id
export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
	const body = await req.json();
	if (!mongoose.Types.ObjectId.isValid(params.userId)) return NextResponse.json({ message: 'User not found' }, { status: 404 });
	const user = await User.findById(params.userId);
	if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

	try {
		await User.findByIdAndUpdate(params.userId, {
			username: body.username || user.username,
			email: body.email || user.email,
			password: body.password || user.password,
			name: body.name || user.name
		});
		return NextResponse.json({ message: 'User updated successfully' }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: 'Error updating user' }, { status: 500 })
	}
};