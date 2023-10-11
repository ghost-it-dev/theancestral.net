import { getPostById } from '@/src/actions/posts';
import ErrorMessage from '@/src/components/ErrorMessage';
import { hasError } from '@/src/lib/response';
import { SpinnerCircular } from 'spinners-react';
import MDViewer from '@/src/components/MDViewer';
import PostActions from './PostActions';
import { getRequestRole, getUserFromSession } from '@/src/actions/user';
import { redirect } from 'next/navigation';
import { PostInterface } from '@/src/models/Post';

interface PageProps {
  params: { postId: PostInterface['_id'] };
}

async function Page({ params }: PageProps) {
  const user = await getUserFromSession();
  const post = await getPostById(params.postId);
  const reqRole = await getRequestRole();

  // I think I want to change this to a modal or something
  if (hasError(post)) {
    return <ErrorMessage message={post.error} />;
  }

  if (reqRole === 'guest' && !post.publicPost) redirect('/');

  return (
    <div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
      <>
        {post ? (
          <>
            <div className='border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center'>
              <div className='flex flex-col w-full'>
                <div className='flex justify-between items-center'>
                  <h1 className='flex-1 text-gray-200 text-lg font-medium'>{post.title}</h1>
                  {(user?.role === 'admin' || user?._id === post.authorId) && <PostActions post={post} />}
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-gray-400 text-sm'>Posted by {post.authorName}</p>
                  <div className='mt-1 flex flex-row gap-1'>
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300 group-hover:bg-[#101826] transition-colors'
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300 group-hover:bg-[#101826] transition-colors'>
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='my-4 xl:my-6 px-4 text-gray-200'>
              <MDViewer text={post.description} />
            </div>
          </>
        ) : (
          <div className='flex h-full items-center justify-center'>
            <SpinnerCircular size={75} thickness={150} secondaryColor='rgba(0, 0, 0, .2)' color='#fff' />
          </div>
        )}
      </>
    </div>
  );
}

export default Page;
