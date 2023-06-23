'use server'

import dbConnect from "@/src/helpers/dbConnection";
import Post from "@/src/models/Post";
import { PostType } from "../types/Post";

async function getPosts(): Promise<PostType[] | null> {
	dbConnect();
	const posts = await Post.find()
	if (!posts) return null

	// if (session.role !== 'guest') return [...publicPosts, ...privatePosts]

	return posts
}

export { getPosts }