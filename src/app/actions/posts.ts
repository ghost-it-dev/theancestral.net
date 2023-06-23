'use server'

import dbConnect from "@/src/helpers/dbConnection";
import Post from "@/src/models/Post";

async function getPosts() {
	dbConnect();
	// const publicPosts = await Post.find({ publicPost: true }).sort({ createdAt: -1 })
	const privatePosts = await Post.find({ publicPost: false }).sort({ createdAt: -1 })
	// const session = await validateSession()

	// if (session.role !== 'guest') return [...publicPosts, ...privatePosts]

	return privatePosts
}

export { getPosts }