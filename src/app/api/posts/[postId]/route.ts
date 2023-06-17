import Post from '@/src/app/models/Post';
import mongoose from 'mongoose';
import { NextResponse, NextRequest } from 'next/server';
import getUserRole from '../../helpers/getRole';
import dbConnect from '@/src/app/lib/dbConnection';

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
	dbConnect();
	const userRole = await getUserRole(req);

	if (!mongoose.isValidObjectId(params.postId)) return NextResponse.json({ message: 'Invalid Post ID' }, { status: 400 });
	const post = await Post.findById(params.postId);
	if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

	if (post.publicPost) {
		return NextResponse.json(post, { status: 200 })
	} else if (!post.publicPost && userRole !== 'guest') {
		return NextResponse.json(post, { status: 200 })
	} else {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
};