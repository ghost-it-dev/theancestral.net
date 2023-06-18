import dbConnect from '../lib/dbConnection';
import Post from '../models/Post';
import User from '../models/User';
import { cookies } from 'next/headers';

async function getPosts() {
  dbConnect();
  const user = await User.findOne({ refreshToken: cookies().get('refreshToken')?.value });
  const userRole = user ? user.role : 'guest';

  const publicPosts = await Post.find({ publicPost: true });
  const privatePosts = await Post.find({ publicPost: false });

  if (userRole === 'admin' || userRole === 'user') {
    return [...publicPosts, ...privatePosts]
  } else {
    return [...publicPosts]
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <span>{post.title}</span>
        </div>
      ))}
    </>
  )
}
