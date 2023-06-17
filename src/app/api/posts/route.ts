import { NextResponse } from "next/server"
import dbConnect from "../../lib/dbConnection"
import Post from "../../models/Post";

export async function GET() {
	dbConnect()

	const publicPosts = await Post.find({ publicPost: true });
	const privatePosts = await Post.find({ publicPost: false });

	// Redo this with nextJS
	// if (res.locals.role === 'admin' || res.locals.role === 'user') {
	// 	return res.status(200).send([...publicPosts, ...privatePosts])
	// } else {
	// 	return res.status(200).send([...publicPosts]);
	// }

	return NextResponse.json([...publicPosts, ...privatePosts])
}

