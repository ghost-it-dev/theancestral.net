'use server';

import dbConnect from '@/src/lib/dbConnection';
import PostActivity, { PostActivityInterface } from '@/src/models/PostActivity';
import { getRequestRole } from '@/src/actions/user';

async function getAllPostActivity({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}): Promise<{ activity?: PostActivityInterface[]; totalCount: number }> {
  dbConnect();
  const reqRole = await getRequestRole();

  const query: any = {};
  if (reqRole === 'guest') query.publicPost = true;
  const totalPostsCount = await PostActivity.countDocuments(query);

  const activity = await PostActivity.find(query)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ updatedAt: -1 });

  return {
    activity: JSON.parse(JSON.stringify(activity)),
    totalCount: totalPostsCount,
  };
}

export { getAllPostActivity };
