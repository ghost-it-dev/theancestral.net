'use server';
import dbConnect from '@/src/lib/dbConnection';
import { getRequestRole, getUserFromSession } from './user';
import Post, { PostInterface } from '@/src/models/Post';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { PostData } from './validations/posts';
import { revalidatePath } from 'next/cache';
import PostActivity from '@/src/models/PostActivity';

async function getPosts(
  pageNumber: number,
  pageSize: number,
): Promise<{ posts?: PostInterface[]; totalCount: number }> {
  dbConnect();
  await getUserFromSession();
  const reqRole = await getRequestRole();

  const query: any = {};
  if (reqRole === 'guest') query.publicPost = true;

  const totalPostsCount = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ updatedAt: -1 });

  return {
    posts: JSON.parse(JSON.stringify(posts)),
    totalCount: totalPostsCount,
  };
}

async function getTags(): Promise<PostInterface['tags']> {
  const tags = await Post.distinct('tags');

  return tags;
}

async function getPostById(_id: PostInterface['_id']): Promise<PostInterface | { error: string }> {
  dbConnect();
  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };
  const post: PostInterface | null = await Post.findOne({ _id });

  if (!post) return { error: 'Post not found' };

  return JSON.parse(JSON.stringify(post));
}

async function createPost(data: PostData): Promise<PostInterface | { error: string }> {
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
    authorName: user.username,
  });

  await PostActivity.create({
    action: 'create',
    postId: post._id,
    postTitle: post.title,
    username: user.username,
  });

  revalidatePath('/');
  redirect('/');
}

async function updatePostById(data: PostData, _id: PostInterface['_id']): Promise<PostInterface | { error: string }> {
  dbConnect();
  const user = await getUserFromSession();
  if (!user) return { error: 'You must be logged in to edit a post' };

  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };
  const post = await Post.findById(_id);
  if (!post) return { error: 'Post not found' };

  if (user.role !== 'admin' && user._id !== post.authorId)
    return { error: 'You do not have permission to edit this post' };

  const updatedFields: Partial<PostInterface> = {
    title: data.title || post.title,
    description: data.description || post.description,
    publicPost: data.hasOwnProperty('publicPost') ? data.publicPost : post.publicPost,
    tags: data.tags || post.tags,
  };

  Object.assign(post, updatedFields);
  await post.save();

  await PostActivity.create({
    action: 'update',
    postId: post._id,
    postTitle: post.title,
    username: user.username,
  });

  revalidatePath(`/post/${post._id}`);
  redirect(`/post/${post._id}`);
}

async function deletePostById(_id: PostInterface['_id']): Promise<{ error?: string; message?: string }> {
  dbConnect();
  const user = await getUserFromSession();

  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };

  const post = await Post.findOne({ _id });
  if (!post) return { error: 'Post not found' };

  if ((user?._id.toString() !== post.authorId.toString() && user?.role !== 'admin') || !user)
    return { error: 'You do not have permission to delete this post' };

  await PostActivity.create({
    action: 'delete',
    postId: post._id,
    postTitle: post.title,
    username: user.username,
  });

  await Post.findByIdAndDelete(_id);

  revalidatePath(`/`);
  redirect('/');
}

export { getPosts, getTags, getPostById, updatePostById, createPost, deletePostById };