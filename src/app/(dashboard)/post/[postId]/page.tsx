import { getPostById } from '@/src/actions/post';
import ErrorMessage from '@/src/components/ErrorMessage';
import { hasError } from '@/src/lib/response';
import { SpinnerCircular } from 'spinners-react';
import MDViewer from '@/src/components/MDViewer';
import PostActions from './PostActions';
import { redirect } from 'next/navigation';
import { PostInterface } from '@/src/models/Post';
import { getRequestRole, getUserFromSession } from '@/src/actions/user';

interface PageProps {
  params: { postId: PostInterface['_id'] };
}

async function Page({ params }: PageProps) {
  const reqUser = await getUserFromSession();
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
            <div className='flex h-[105px] items-center border-b border-t border-[#1F2C37] px-4 py-4 pb-4 xl:border-t-0 xl:pt-6'>
              <div className='flex w-full flex-col'>
                <div className='flex items-center justify-between'>
                  <h1 className='flex-1 text-lg font-medium text-gray-200'>{post.title}</h1>
                  {(reqUser?.role === 'admin' || reqUser?._id === post.authorId) && <PostActions post={post} />}
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-gray-400'>Posted by {post.authorName}</p>
                  <div className='mt-1 flex flex-row gap-1'>
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className='flex items-center rounded-[4px] bg-[#1E2936] px-1.5 py-0.5 text-xs font-bold text-gray-300 transition-colors group-hover:bg-[#101826]'
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className='flex items-center rounded-[4px] bg-[#1E2936] px-1.5 py-0.5 text-xs font-bold text-gray-300 transition-colors group-hover:bg-[#101826]'>
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='my-4 px-4 text-gray-200 xl:my-6'>
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
