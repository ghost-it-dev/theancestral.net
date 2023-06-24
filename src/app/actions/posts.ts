'use server'

import dbConnect from '@/src/helpers/dbConnection';
import { PostType } from '../types/Post';
import { getRequestRole } from './user';
import Post from '@/src/models/Post';
import { redirect } from 'next/navigation';

async function getPosts(): Promise<PostType[] | null> {
	dbConnect();
	const role = await getRequestRole()

	// If the user is a guest, only return public posts
	const publicPosts = await Post.find({ publicPost: true })
	if (role === 'guest') return publicPosts

	// If the user is an admin or user, return all posts
	const privatePosts = await Post.find({ publicPost: false })
	return [...publicPosts, ...privatePosts]
}

async function getPostById(id: PostType['_id']): Promise<PostType | null> {
	dbConnect();
	const role = await getRequestRole()
	const post = await Post.findOne({ _id: id })

	if (!post) return null
	if (role === 'guest' && !post.publicPost) return redirect('/')

	return post
}

export { getPosts, getPostById }