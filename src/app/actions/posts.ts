'use server'

import dbConnect from '@/src/helpers/dbConnection';
import { PostType } from '../types/Post';
import { getRequestRole, getUserFromSession } from './user';
import Post from '@/src/models/Post';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

async function getPosts(): Promise<PostType[]> {
	dbConnect();
	const reqRole = await getRequestRole()

	// If the user is a guest, only return public posts
	const publicPosts = await Post.find({ publicPost: true })
	if (reqRole === 'guest') return publicPosts

	// If the user is an admin or user, return all posts
	const privatePosts = await Post.find({ publicPost: false })
	return [...publicPosts, ...privatePosts]
}

async function getPostById(_id: PostType['_id']): Promise<PostType | { error: string }> {
	dbConnect();
	const reqRole = await getRequestRole()
	const isValidPost = mongoose.isValidObjectId(_id)
	if (!isValidPost) return { error: 'Invalid post id' }
	const post: PostType | null = await Post.findOne({ _id })

	if (!post) return { error: 'Post not found' }
	if (reqRole === 'guest' && !post.publicPost) return redirect('/')

	return post
}

async function createPost({ title, description, publicPost, tags }: Partial<PostType>): Promise<PostType | { error: string }> {
	dbConnect();
	const user = await getUserFromSession()
	if (!user) return { error: 'You must be logged in to create a post' }
	if (!title || !description) return { error: 'You must provide a title and description' }

	const post = await Post.create({
		title,
		tags,
		description,
		publicPost: publicPost ?? false,
		authorId: user._id
	})

	return post
}

async function updatePostById({ _id, title, description, publicPost, tags }: Partial<PostType>): Promise<PostType | { error: string }> {
	dbConnect();
	const user = await getUserFromSession();
	if (!user) return { error: 'You must be logged in to edit a post' };

	const post = await Post.findOne({ _id });
	if (!post) return { error: 'Post not found' };

	if (user.role !== 'admin' && user._id !== post.authorId) return { error: 'You do not have permission to edit this post' }

	const updatedFields: Partial<PostType> = {
		title: title ?? post.title,
		description: description ?? post.description,
		publicPost: publicPost ?? post.publicPost,
		tags: tags ?? post.tags,
	};

	Object.assign(post, updatedFields);
	await post.save();

	return post;
}

async function deletePostById(_id: PostType['_id']): Promise<{ error?: string, message?: string }> {
	dbConnect();
	const user = await getUserFromSession()
	const post = await Post.findOne({ _id })
	if (!post) return { error: 'Post not found' }

	if (user?.role !== 'admin' || user._id !== post.authorId) return { error: 'You do not have permission to delete this post' }

	await Post.findByIdAndDelete(_id)
	return { message: 'Post succesfully deleted' }
}

export { getPosts, getPostById, updatePostById, createPost, deletePostById }