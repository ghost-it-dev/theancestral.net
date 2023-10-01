'use server';
import dbConnect from '@/src/lib/dbConnection';
import PostActivity, { PostActivityInterface } from '@/src/models/PostActivity';

async function getAllPostActivity({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }): Promise<PostActivityInterface[]> {
  dbConnect();
  const activity = await PostActivity.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ updatedAt: -1 });

  return JSON.parse(JSON.stringify(activity));
}

export { getAllPostActivity };
