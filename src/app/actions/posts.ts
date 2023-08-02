'use server';

import dbConnect from '@/src/lib/dbConnection';
import { PostType } from '../types/Post';
import { getRequestRole, getUserFromSession } from './user';
import Post from '@/src/models/Post';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { PostCreateData, PostUpdateData } from './validations/posts';
import { revalidatePath } from 'next/cache';

async function getPosts(): Promise<PostType[] | []> {
  dbConnect();
  const reqRole = await getRequestRole();

  // If the user is a guest, only return public posts
  const publicPosts = await Post.find({ publicPost: true });
  if (reqRole === 'guest') return publicPosts;

  // If the user is an admin or user, return all posts
  const privatePosts = await Post.find({ publicPost: false });
  return JSON.parse(JSON.stringify([...publicPosts, ...privatePosts]));
}

async function getPostById(_id: PostType['_id']): Promise<PostType | { error: string }> {
  dbConnect();
  const reqRole = await getRequestRole();
  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };
  const post: PostType | null = await Post.findOne({ _id });

  if (!post) return { error: 'Post not found' };
  if (reqRole === 'guest' && !post.publicPost) return redirect('/');

  return JSON.parse(JSON.stringify(post));
}

async function createPost(data: PostCreateData): Promise<PostType | { error: string }> {
  dbConnect();
  const user = await getUserFromSession();
  if (!user) return { error: 'You must be logged in to create a post' };
  if (!data.title || !data.description) return { error: 'You must provide a title and description' };

  const post = await Post.create({
    title: data.title,
    tags: data.tags,
    description: data.description,
    publicPost: data.publicPost,
    authorId: user._id,
  });

  revalidatePath('/');
  return JSON.parse(JSON.stringify(post));
}

async function updatePostById(data: PostUpdateData): Promise<PostType | { error: string }> {
  dbConnect();
  const user = await getUserFromSession();
  if (!user) return { error: 'You must be logged in to edit a post' };

  const isValidPost = mongoose.isValidObjectId(data._id);
  if (!isValidPost) return { error: 'Invalid post id' };
  const post = await Post.findOne({ _id: data._id });
  if (!post) return { error: 'Post not found' };

  if (user.role !== 'admin' && user._id !== post.authorId)
    return { error: 'You do not have permission to edit this post' };

  const updatedFields: Partial<PostType> = {
    title: data.title || post.title,
    description: data.description || post.description,
    publicPost: data.hasOwnProperty('publicPost') ? data.publicPost : post.publicPost,
    tags: data.tags || post.tags,
  };

  Object.assign(post, updatedFields);
  await post.save();

  revalidatePath(`/posts/${post._id}`);
  return JSON.parse(JSON.stringify(post));
}

async function deletePostById(_id: PostType['_id']): Promise<{ error?: string; message?: string }> {
  dbConnect();
  const user = await getUserFromSession();

  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };

  const post = await Post.findOne({ _id });
  if (!post) return { error: 'Post not found' };

  if (user?.role !== 'admin' || user._id !== post.authorId)
    return { error: 'You do not have permission to delete this post' };

  await Post.findByIdAndDelete(_id);

  revalidatePath(`/`);
  return { message: 'Post succesfully deleted' };
}

export { getPosts, getPostById, updatePostById, createPost, deletePostById };
