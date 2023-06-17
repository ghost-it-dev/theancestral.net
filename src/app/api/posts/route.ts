import { NextRequest, NextResponse } from "next/server"
import dbConnect from "../../../lib/dbConnection"
import Post from "../../../models/Post";
import getUserRole from "../../../lib/getUserRole";

export async function GET(req: NextRequest) {
	dbConnect()
	const userRole = await getUserRole(req)

	const publicPosts = await Post.find({ publicPost: true });
	const privatePosts = await Post.find({ publicPost: false });

	// Redo this with nextJS
	if (userRole === 'admin' || userRole === 'user') {
		return NextResponse.json([...publicPosts, ...privatePosts], { status: 200 })
	} else {
		return NextResponse.json([...publicPosts], { status: 200 })
	}
}

