'use server';
import dbConnect from '@/src/lib/dbConnection';
import PostActivity, { PostActivityInterface } from '@/src/models/PostActivity';

async function getAllPostActivity(): Promise<PostActivityInterface[]> {
  dbConnect();
  const activity = await PostActivity.find().sort({ createdAt: -1 }).limit(5);

  return JSON.parse(JSON.stringify(activity));
}

export { getAllPostActivity };
