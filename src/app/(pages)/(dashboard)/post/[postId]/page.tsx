import { getPostById } from '@/src/app/actions/posts';
import ErrorMessage from '@/src/app/components/ErrorMessage';
import { hasError } from '@/src/lib/hasError';
import { SpinnerCircular } from 'spinners-react';
import MDViewer from '@/src/app/components/MDViewer';
import PostActions from './PostActions';
import { getUserFromSession } from '@/src/app/actions/user';

interface PageProps {
  params: { postId: string };
}

async function Page({ params }: PageProps) {
  const user = await getUserFromSession();
  const post = await getPostById(params.postId);

  // redirect to error page
  if (hasError(post)) {
    return <ErrorMessage message={post.error} />;
  }

  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <>
        {post ? (
          <>
            <div className="border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center">
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <h1 className="flex-1 text-gray-200 text-lg font-medium">{post.title}</h1>
                  {(user?.role === 'admin' || user?._id === post.authorId) && <PostActions post={post} />}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">Posted by {post.authorName}</p>
                  <div className="mt-1 flex flex-row gap-1">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300 group-hover:bg-[#101826] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4 xl:my-6 px-4 text-gray-200">
              <MDViewer text={post.description} />
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <SpinnerCircular size={75} thickness={150} secondaryColor="rgba(0, 0, 0, .2)" color="#fff" />
          </div>
        )}
      </>
    </div>
  );
}

export default Page;
