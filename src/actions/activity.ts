'use server';
import dbConnect from '@/src/lib/dbConnection';
import PostActivity, { PostActivityInterface } from '@/src/models/PostActivity';

async function getAllPostActivity({ limit }: { limit: number }): Promise<PostActivityInterface[]> {
  dbConnect();
  const activity = await PostActivity.find().sort({ createdAt: -1 }).limit(limit);

  return JSON.parse(JSON.stringify(activity));
}

export { getAllPostActivity };
