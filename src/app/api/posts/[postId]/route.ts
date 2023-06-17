import Post from '@/src/app/models/Post';
import mongoose from 'mongoose';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { postId: string } }) {
	if (!mongoose.isValidObjectId(params.postId)) return NextResponse.json({ message: 'Invalid Post ID' }, { status: 400 });
	const post = await Post.findById(params.postId);
	if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

	// refactor this with nextAuth
	// if (post.publicPost) {
	// 	return res.status(200).send(post);
	// } else if (!post.publicPost && res.locals.role !== 'guest') {
	// 	return res.status(200).send(post);
	// } else {
	// 	return res.status(401).json({ message: 'Unauthorized' });
	// }

	return NextResponse.json(post, { status: 200 })
};